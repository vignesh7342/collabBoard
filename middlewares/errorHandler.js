const config = require("../config/config");

const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Server Error";

    console.error(err);

    if (config.isDevelopment) {
        res.status(status).json({
            error: message,
            stack: err.stack,
        });
    }
    else {
        if (err.isOperational) {
            res.status(status).json({
            error: message,
        });
    } 
    else {
        res.status(500).json({
        error: "Something went wrong.",
        });
    }
}
};

module.exports = errorHandler;