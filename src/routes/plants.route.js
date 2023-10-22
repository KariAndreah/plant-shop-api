const express = require("express");

const router = express.Router();

const plantsController = require("../controllers/plants.controller.js");

router.get("/", (req, res) => res.send("Hello World!"));

router.get("/plants", plantsController.getAll);

router.get("/plants/:id", plantsController.getById);

router.post("/plants/:id/purchase", plantsController.createNewOrder);

router.get("/orders", plantsController.getAllOrders);

router.get("/orders/:id", plantsController.getAllOrdersById);

console.log("Welcome to Kari's Plant Shop");

module.exports = router;
