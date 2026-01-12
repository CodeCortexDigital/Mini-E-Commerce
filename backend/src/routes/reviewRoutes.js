const express = require("express");
const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/* ===============================
   PRODUCT REVIEWS ROUTES
   =============================== */

// Add review (logged-in user)
router.post("/:id/reviews", protect, addReview);

// Get all reviews of a product
router.get("/:id/reviews", getReviews);

module.exports = router;
