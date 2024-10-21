const express = require("express");
const { query } = require("express-validator");

const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/login", authControllers.login);

router.post("/register", authControllers.register);

router.put("/change-password", authControllers.changePassword);

router.put("/verifyEmail", authControllers.verifyEmail);

module.exports = router;
