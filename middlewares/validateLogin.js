const AppError = require("../utils/AppError");

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and password are required", 400));
    }

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return next(new AppError("Invalid input type", 400));
    }

    if (
        email.trim() === "" ||
        password.trim() === ""
    ) {
        return next(new AppError("Fields cannot be empty", 400));
    }

    next();
};

module.exports = validateLogin;