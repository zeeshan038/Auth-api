//NPM Packages
const bcrypt = require("bcrypt");
//Paths
const user = require("../models/user");
const { signpSchema, loginSchema } = require("../schema/User");
const genrateToken = require("../utils/genrateToken");

module.exports.testing = async (req, res) => {
  res.status(200).json({
    status: true,
    msg: "Testing.....",
  });
};

/**
 * @desciption signup user
 * @route POST /api/user/signup
 * @access Public
 */

module.exports.signup = async (req, res) => {
  //    joi  validation
  const { error } = signpSchema(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      msg: error.details[0].message,
    });
  }
  //fields from body
  const { name, email, password, confirmPassword } = req.body;

  //signup
  try {
    //checking if user exists
    const existingUser = await user.findOne({ email } );
    if (existingUser) {
      return res.status(400).json({
        status: false,
        msg: "User with this email is already exisits",
      });
    }

    //password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        msg: "Password do not match",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswordd = await bcrypt.hash(password, salt);

    // creating user and saving to mongodb
    await user.create({
      name,
      email,
      password: hashedPasswordd,
    });
    return res.status(201).json({
      status: true,
      msg: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error : error.message,
    });
  }
};

/**
 * @desciption login user
 * @route POST /api/user/login
 * @access Public
 */

module.exports.login = async (req, res) => {
  const payload = req.body;

  //Error Handling
  const result = loginSchema(payload);
  if (result.error) {
    const errors = result.error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: false,
      msg: errors,
    });
  }

  try {
    //Checking valid user
    const validUser = await user.findOne({ email: payload.email }).select(
      "password"
    );
    if (!validUser) {
      return res.status(401).json({
        status: false,
        msg: "Email or Password is incorrect",
      });
    }

    //Checking password
    const validPassword = await bcrypt.compareSync(
      payload.password,
      validUser.password
    );
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        msg: "Email or Password is incorrect",
      });
    }

    const token = genrateToken(validUser._id);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        status: true,
        message: "User Logged In Successfully!",
        id: validUser._id,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      errors: error.message,
    });
  }
};
