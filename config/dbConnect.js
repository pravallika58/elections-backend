const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://elections:O2Y8h69aG057fP4r@senecio-db-f0f2a005.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=senecio-db";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dbConnect = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = dbConnect;
