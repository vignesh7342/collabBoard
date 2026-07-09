const catchAsync = require("../utils/catchAsync");
const { verifyToken } = require("../utils/jwt");
const userService = require("../services/userService");
const AppError = require("../utils/AppError");

module.exports = catchAsync(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new AppError("Authentication required", 401));
    }

    const decoded = verifyToken(token);

    const user = await userService.getUserById(decoded.id);

    if (!user) {
        return next(new AppError("User no longer exists", 401));
    }

    socket.user = user;

    next();
});