const express = require('express');
const router = express.Router();

const userController = require("../controller/users");
const { verifyToken } = require('../middleware/verifyToken');
const { verify } = require('jsonwebtoken');

router.get("/", userController.welcome);
router.post("/signUp", userController.addUser);
router.post("/login", userController.login);
router.get("/getUser", verifyToken, userController.getUser);
router.post("/cancel", verifyToken, userController.cancel);
router.post("/subscriptionPurchased", verifyToken, userController.subscriptionPurchased);

module.exports = router;