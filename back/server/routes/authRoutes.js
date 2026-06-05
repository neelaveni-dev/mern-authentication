const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
    console.log("REGISTER API HIT");
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    console.log("Before Save");
    await newUser.save();
    console.log("After Save");

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("REGISTER ERROR:");
    console.log(err);

    res.status(500).json({
        message: err.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user:{
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.log("REGISTER ERROR:" ,err);
    console.log(err);

    res.status(500).json({ message: err.message });
  }
});
router.put("/update-profile", async (req, res) => {
  try {
    const { email, name, phone, address } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        phone,
        address,
      },
      { new: true }
    );

    res.json({
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.put("/change-password", async (req, res) => {
  const {
    email,
    currentPassword,
    newPassword,
  } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const match = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!match)
    return res.status(400).json({
      message: "Wrong Password",
    });

  user.password = await bcrypt.hash(
    newPassword,
    10
  );

  await user.save();

  res.json({
    message: "Password Updated",
  });
});
module.exports = router;