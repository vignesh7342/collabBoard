const pool = require("../database/db");

const { verifyToken } = require("../utils/jwt");

const AppError = require("../utils/AppError");

const catchAsync = require("../utils/catchAsync");

const authenticate = catchAsync(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const result = await pool.query(
        "SELECT id, name, email FROM users WHERE id = $1",
        [decoded.id]
    );

    if (result.rowCount === 0) {
        throw new AppError(
            "User no longer exists",
            401
        );
    }
    
    req.user = result.rows[0];
    next();
});

module.exports = authenticate;