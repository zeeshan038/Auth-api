// NPM Packages
const router = require("express").Router();

// paths
const userRoutes = require("./user");

router.use("/user",userRoutes);


module.exports = router;