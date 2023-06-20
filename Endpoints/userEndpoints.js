const express = require("express");
const { logInUser, getAllUsers, signUpUser} = require("../controllers/userController");
const router = express.Router();

router.post("/signIn", logInUser);
router.get("/allUsers", getAllUsers);
router.post("/signUp", signUpUser);

module.exports = router;

