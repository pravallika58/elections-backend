const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
dbConnect();

require("./startup/routes")(app);

app.listen(PORT);
