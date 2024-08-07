const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAdminToken, adminCredentials } = require("../middleware/adminAuthMiddleware");


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  console.log(adminCredentials.username)
  
  if (username !== adminCredentials.username) {
    console.log(`username not working`);
    
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const passwordMatch = await bcrypt.compare(password, adminCredentials.password);
  if (!passwordMatch) {
    console.log(`password not match`);
    
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username: adminCredentials.username }, "admin-secret-key", { expiresIn: "1h" });
  console.log(`token gen working`);
  
  res.cookie("AdminAuthToken", token);
  res.json({ message: "Admin login successful" });
});


router.get("/users", verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/users/:id", verifyAdminToken, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("AdminAuthToken");
  res.status(200).send("Logout successful");
  return res;
});

module.exports = router;
