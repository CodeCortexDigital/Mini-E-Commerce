const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

/* ---------- Public ---------- */
router.get("/", getProducts);
router.get("/:id", getProductById);

/* ---------- Admin ---------- */
router.post("/", protect, authorizeRoles("admin"), createProduct);
router.put("/:id", protect, authorizeRoles("admin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;
