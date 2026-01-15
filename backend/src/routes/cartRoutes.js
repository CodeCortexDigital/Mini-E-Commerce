const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/* ---------- Cart ---------- */
router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);

module.exports = router;
