const userService = require("../services/userService");
const userService = require("../services/userService");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(201).json({
        message: "User created successfully",
        user
    });
});

const loginUser = catchAsync(async (req, res) => {
    const result = await userService.loginUser(req.body);

    res.status(200).json({
        message: "Login successful",
        ...result
    });
});

module.exports = {
    createUser,
    loginUser
};