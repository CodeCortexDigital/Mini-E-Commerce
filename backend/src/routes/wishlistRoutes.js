const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/* ===============================
   USER WISHLIST ROUTES
   =============================== */
router.get("/", protect, getWishlist);
router.post("/add", protect, addToWishlist);
router.delete("/remove/:productId", protect, removeFromWishlist);

module.exports = router;
