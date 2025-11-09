const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

// All order routes are protected and require a valid token
router.use(authMiddleware.isLoggedIn);

// POST /api/orders/
// Create a new order
router.post("/", controller.createOrder);

// GET /api/orders/
// Get all orders
router.get("/", controller.getAllOrders);

// GET /api/orders/:billNo
// Get a single order by BillNo
router.get("/:billNo", controller.getOrderByBillNo);

// PUT /api/orders/:billNo
// Update an order by BillNo
router.put("/:billNo", controller.updateOrder);

// DELETE /api/orders/:billNo
// Delete an order by BillNo
router.delete("/:billNo", controller.deleteOrder);

module.exports = router;
