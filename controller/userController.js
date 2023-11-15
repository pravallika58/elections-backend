const { generateToken } = require("../config/jwtToken");
const { genrateRefreshToken } = require("../config/refreshToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const sendEmail = require("./emailController");
const crypto = require("crypto");
const validateMongoDbId = require("../utils/validateMongoDbId");

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    res.status(400).send({
      status: false,
      message: "Password and Confirm Password do not match",
    });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send({
      status: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
  });

  res.send({
    data: user,
    status: true,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = genrateRefreshToken(findUser?._id);
    const updatingUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.send({
      data: updatingUser,
      status: true,
    });
  } else {
    res.status(400).send({
      status: false,
      message: "Invalid email or password",
    });
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error(" User not found");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `Hi, Please follow link to reset your password.Valid for 10 minutes only.<a href='http://localhost:10000/api/user/reset-password/${token}'>Click</a> `;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password",
      html: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const logOut = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token is found!");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204).send({
    status: true,
    message: "Log out successfully",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expired");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token is found!");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("User not found");
  jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with Refresh Token");
    } else {
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    }
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        title: req?.body?.title,
        email: req?.body?.email,
        imageUrl: req?.body?.imageUrl,
      },
      {
        new: true,
      }
    );
    res.send({
      data: updateUser,
      status: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send({
      data: user,
      status: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  handleRefreshToken,
  forgotPasswordToken,
  resetPassword,
  logOut,
  updateUser,
  getUser,
};
