const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/* ===============================
   USER PROFILE ROUTES
   =============================== */

// Get logged-in user profile
router.get("/profile", protect, getProfile);

// Update logged-in user profile
router.put("/profile", protect, updateProfile);

module.exports = router;
