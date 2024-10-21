const express = require("express");
const mortuaryAuth = require("../middlewares/mortuaryAuth");

const obituaryControllers = require("../controllers/obituaryControllers");

const router = express.Router();

router.get(
  "/getAllObituaries",
  // mortuaryAuth,
  obituaryControllers.getAllObituaries
);

router.get(
  "/getSingleObituary/:id",
  // mortuaryAuth,
  obituaryControllers.getSingleObituary
);

router.post(
  "/createObituary",
  // mortuaryAuth,
  obituaryControllers.createObituary
);

router.put("/updateObituary/:id", obituaryControllers.updateObituary);

router.delete(
  "/deleteObituary",
  // mortuaryAuth,
  obituaryControllers.deleteObituary
);

module.exports = router;
