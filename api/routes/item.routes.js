const express = require("express");
const router = express.Router();
const controller = require("../controllers/item.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

// All item routes are protected
router.use(authMiddleware.isLoggedIn);

// --- Routes for Gents & Ladies Items ---
// The ':type' parameter will be 'gents' or 'ladies'

// POST /api/items/:type/
// Create a new item (e.g., POST /api/items/gents)
router.post("/:type", controller.createItem);

// GET /api/items/:type/
// Get all items for a type (e.g., GET /api/items/ladies)
router.get("/:type", controller.getItems);

// GET /api/items/:type/:id
// Get one item by ID (e.g., GET /api/items/gents/5)
//router.get("/:type/:id", controller.getOneItem);

// PUT /api/items/:type/:id
// Update an item by ID
router.put("/:type/:id", controller.updateItem);

// DELETE /api/items/:type/:id
// Delete an item by ID
router.delete("/:type/:id", controller.deleteItem);

module.exports = router;
