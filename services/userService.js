const bcrypt = require("bcrypt");

const pool = require("../database/db");

const AppError = require("../utils/AppError");

const jwt = require("jsonwebtoken");

const config = require("../config/config");

const createUser = async ({ name, email, password }) => {
    const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (existingUser.rowCount > 0) {
        throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
        [name, email, hashedPassword]
    );

    return result.rows[0];
};

const loginUser = async ({ email, password }) => {
    const user = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (user.rowCount === 0) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const existingUser = user.rows[0];

    const isMatch = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isMatch) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const token = jwt.sign(
        {
            id: existingUser.id
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpiresIn
        }
    );

    return {
        token,
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
        }
    };
};

module.exports = {
    createUser,
    loginUser
};