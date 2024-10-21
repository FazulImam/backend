const express = require("express");

const mortuaryControllers = require("../controllers/mortuaryControllers");

const router = express.Router();

router.post("/login", mortuaryControllers.mortuaryLogin);

router.post("/register", mortuaryControllers.mortuaryRegister);

router.get("/getSingleMortuary/:id", mortuaryControllers.getSingleMortuary);

module.exports = router;
