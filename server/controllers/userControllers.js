const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const bcrypt = require("bcryptjs");

const fs = require("fs");
const User = require("../models/userModel");
const userRouter = require("../routes/userRoutes");
const { db } = require("../models/userModel");
const { json } = require("body-parser");

// @desc      Regisster New userModel
// @route     POST/user/
// @access    Public

const registerUser = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Field Can not be empty");
  }

  //   check if the user is already exist
  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json({
      success: false,
      message: "User already exist, please login",
    });
  }

  //  Encryting the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const saveUser = await User.create({ name, email, password: hashedPassword });
  if (saveUser) {
    res.status(201).json({
      success: true,
      _id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email,
      token: generateToken(saveUser._id),
    });
  } else {
    res.status(400).json({
      success: false,
      message: "User already existe",
    });
  }

  //   res.json({ message: "Register user" });
};

// @desc      Authenticate New user
// @route     POST/user/login
// @access    Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate("listedProducts");
  // console.log(email, password);
  // console.log(await bcrypt.compare(password, user.password));

  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    if (isPasswordMatch) {
      res.json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        avatarString: user.avatarString,
        listedProducts: user.listedProducts,
        token: generateToken(user._id),
      });
    } else {
      // console.log(user);
      res
        .status(400)
        .json({ success: false, message: "Password does not match" });
      //   throw new Error("Invalid Credentials");
    }
  } else {
    res.status(400).json({
      success: false,
      message: "User does not exist,please make an account first",
    });
  }
};

// @desc      Get User Data
// @route     user/
// @access    Private

const getCurrentLoggedInUser = async (req, res) => {
  res.status(200).json({ message: "getCurrentLoggedInUser " });
};

const logOutUser = async (req, res) => {
  console.log("logging Out");
};

// genrating tokens JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "SECERET", { expiresIn: "1d" });
};

// UPLOADING AVATAR

const uploadAvatar = async (req, res) => {
  // console.log(req.body._id);
  // console.log(`file : ${JSON.stringify(req.file)}`);

  // console.log("pathhhh");
  const jsonFile = JSON.parse(JSON.stringify(req.file));
  // let user = localStorage.getItem("user");
  // console.log(user);
  // console.log(jsonFile);

  const dbUser = await User.findOne({ _id: req.body._id });
  // console.log(dbUser);

  const query = { _id: req.body._id };

  var data = {
    // avatar: { data: req.file.filename, ContentType: "image/jpg" },
    avatarString: jsonFile.filename,
  };

  User.updateOne(query, data, async (err, userData) => {
    if (err) {
      res
        .status(200)
        .json({ success: false, message: "Error in uploading image" });
    }
    // console.log("userdata :", userData);
    const dbUser = await User.findOne({ _id: req.body._id }).select(
      "-password"
    );
    // console.log(dbUser);
    res.status(200).json({
      success: false,
      message: "Image Uploaded Successfully",
      updatedUser: dbUser,
    });
  });
};

const getUserData = async (req, res) => {
  // console.log(req.params);
  try {
    const user = await User.findOne({ _id: req.params.userId });
    // console.log(user);

    if (user) {
      res.status(200).json({ success: true, response: user });
    } else {
      res.status(400).json({ success: false, error: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Not found" });
  }
};

const getUserListing = async (req, res) => {
  try {
    const listingProducts = await User.findOne({ _id: req.params.userId })
      .select("listedProducts")
      .populate("listedProducts");
    // console.log(listingProducts);

    if (listingProducts) {
      res.status(200).json({ success: true, response: listingProducts });
    } else {
      res.status(400).json({ success: false, error: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentLoggedInUser,
  uploadAvatar,
  getUserListing,
  getUserData,
};
