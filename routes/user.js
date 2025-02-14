// NPM Packages
const router = require("express").Router();

//controller paths
const { testing, signup, login } = require("../controllers/user");

router.get("/test", testing);
router.post("/signup" , signup);
router.post('/login' , login)

module.exports = router;    