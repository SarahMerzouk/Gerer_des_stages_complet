const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require('../utils/VerifyToken');
const router = express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/all-users",verifyToken,userController.allUsers);
router.patch("/update-role",verifyToken,userController.updateUserRole);
router.delete("/delete-user",verifyToken,userController.deleteUser);
router.get("/:id/verify/:token",userController.verifyUser);
router.post("/sendPswEmail",userController.sendEmailPassword);
router.post("/changepassword",userController.updatePassword);
router.post("/update-user", userController.updateUser);
router.get("/:id", userController.getUserById);


module.exports = router;