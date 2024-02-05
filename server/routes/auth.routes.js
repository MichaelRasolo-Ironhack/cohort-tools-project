const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check empty fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Fill the fields bitch 💋" });
    }

    // Check Email or Name already exist
    const userNameAlreadyExist = await User.findOne({ name: name });
    const userEmailAlreadyExist = await User.findOne({ email: email });

    if (userNameAlreadyExist || userEmailAlreadyExist) {
      return res
        .status(400)
        .json({ message: "Mail or name already exist bitch 💋" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Fill the fields bitch 💋" });
    }

    // Check email already exist
    const currentUser = await User.findOne({ email }).select("name password");

    if (!currentUser) {
      return res.status(400).json({ message: "Cannot find user bitch 💋" });
    }

    const matchingPassword = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!matchingPassword) {
      return res.status(401).json({ message: "Wrong password bitch 💋" });
    }

    const token = jwt.sign({ _id: currentUser._id }, process.env.SECRET_TOKEN, {
      algorithm: "HS256",
    });

    res.status(202).json({ authToken: token });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
