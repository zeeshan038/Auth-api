// NPM Package
const { mongoose } = require("mongoose");

//mongo db uri
const uri = process.env.MONGO_URI;
const connectDb = async () => {
  mongoose
    .connect(uri, {
      dbName: "AuthApi's",
    })
    .then(() => {
      console.log("Db connected");
    })
    .catch((e) => {
      console.log("Error ocurred while connecting db", e);
    });
};

module.exports = connectDb;
