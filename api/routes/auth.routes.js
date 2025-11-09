const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller.js");

// POST /api/auth/login
router.post("/login", controller.login);

// POST /api/auth/register
// (Optional: use this to create new admin users)
router.post("/register", controller.register);

module.exports = router;
