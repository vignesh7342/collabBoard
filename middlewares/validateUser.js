const AppError = require("../utils/AppError");

const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new AppError("All fields are required", 400));
    }

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return next(new AppError("Invalid input type", 400));
    }

    if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        return next(new AppError("Fields cannot be empty", 400));
    }

    next();
};

module.exports = validateUser;