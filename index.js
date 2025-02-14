// NPM Packages
const express = require("express");
const cors = require("cors")
require("dotenv").config();
const app = express();


app.use(cors())
//Paths
const connectDb = require("./config/db");

//db Connection
connectDb();

//middlewares 
app.use(express.json())


//project routes
const apiRoutes = require("./routes/index");

//routes
app.use("/api", apiRoutes);

const PORT = 
//server start
app.listen(3000, () => {
  console.log("server is running 3000");
});
