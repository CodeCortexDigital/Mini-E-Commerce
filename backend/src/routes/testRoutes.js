const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/* ---------- Protected Test Route ---------- */
router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You accessed a protected route",
    user: req.user,
  });
});

module.exports = router;
