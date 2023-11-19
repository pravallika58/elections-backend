// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://elections:yHyBu3lx9HBi4wBc@cluster0.ul85luw.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const dbConnect = async () => {
//   try {
//     await client.connect();
//     await client.db("elections").command({ ping: 1 });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   } finally {
//     await client.close();
//   }
// };
// module.exports = dbConnect;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Server is not connected");
  }
};

module.exports = dbConnect;
