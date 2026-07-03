require("dotenv").config();

const requiredVariables = [
    "DB_USER",
    "DB_HOST",
    "DB_NAME",
    "DB_PASSWORD",
    "DB_PORT",
    "JWT_SECRET",
    "JWT_EXPIRES_IN"
];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(
            `Missing required environment variable: ${variable}`
        );
    }
}

const config = {
    
    env: process.env.NODE_ENV,

    isDevelopment:
        process.env.NODE_ENV === "development",

    isProduction:
        process.env.NODE_ENV === "production",

    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN   
    },
};

module.exports = config;