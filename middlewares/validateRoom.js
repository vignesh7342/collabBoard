const AppError = require("../utils/AppError");
const validateRoom = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        throw new AppError(
            "Room name is required",
            400
        );
    }
    if (typeof name !== "string") {
        throw new AppError(
            "Room name must be a string",
            400
        );
    }
    if (name.trim() === "") {
        throw new AppError(
            "Room name cannot be empty",
            400
        );
    }
    next();
};
module.exports = validateRoom;