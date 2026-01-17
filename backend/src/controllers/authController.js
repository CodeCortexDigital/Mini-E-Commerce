const bcrypt = require("bcryptjs");
const User = require("../models/User");

/* =========================================================
   REGISTER USER
========================================================= */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Debug log (VERY IMPORTANT)
    console.log("REGISTER BODY:", req.body);

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // 2️⃣ Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password (IMPORTANT FIX)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",   // ✅ IMPORTANT (prevents Mongo error)
    });

    // 5️⃣ Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};
