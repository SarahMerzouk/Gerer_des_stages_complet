const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require('../utils/VerifyToken');
const router = express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/all-users",verifyToken,userController.allUsers);
router.patch("/update-role",verifyToken,userController.updateUserRole);
router.delete("/delete-user",verifyToken,userController.deleteUser);

module.exports = router;