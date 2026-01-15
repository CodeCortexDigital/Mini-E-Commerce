const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

/* ===============================
   USER
   =============================== */
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

/* ===============================
   ADMIN
   =============================== */
router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put("/:id", protect, authorizeRoles("admin"), updateOrderStatus);

module.exports = router;
