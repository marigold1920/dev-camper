const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, request, response, next) => {
    console.log(error);
    // Mongo bad Object Id
    let errorObject = { ...error };
    if (error.name === "CastError") {
        const message = `Resource not found with id of ${error.value}`;
        errorObject = new ErrorResponse(message, 404);
    }

    if (error.code === 11000) {
        const message = `Duplicate field value entered for ${error.keyValue.name}`;
        errorObject = new ErrorResponse(message, 400);
    }

    if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map(value => value.message);
        errorObject = new ErrorResponse(message, 400);
    }

    response.status(errorObject.statusCode || 500).json({
        success: false,
        errorMessage: errorObject.message || "Server error!"
    });
};

module.exports = errorHandler;
