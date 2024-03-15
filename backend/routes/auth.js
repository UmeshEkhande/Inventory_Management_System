const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signUp", async (req, res) => {
  console.log("Call reached..... server ...");
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    console.log(newUser);

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, " ", password);

  try {
    const user = await User.findOne({ email });

    console.log("Email:", user);

    if (!user) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect" });
    }

    console.log("Reached....");
    console.log("Pass", user.password);
    console.log("Emial", user.email);

    let isPasswordValid = false;
    if (password == user.password) {
      isPasswordValid = true;
    } else {
      isPasswordValid = false;
    }

    console.log(isPasswordValid);

    if (isPasswordValid) {
      return res
        .status(200)
        .json({
          message: "Sign-in successful",
          username: user.username,
          redirectTo: "/main",
        });
    } else {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during sign-in" });
  }
});

module.exports = router;
