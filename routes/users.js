const express = require("express");

const router = express.Router();

const { createUser, loginUser } = require("../controllers/userController");

const validateUser = require("../middlewares/validateUser");
const validateLogin = require("../middlewares/validateLogin");

router.post("/", validateUser, createUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;