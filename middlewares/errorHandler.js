export const errorHandler = (err, req, res, next) => {
    console.error("Error occurred:", err);

    // Set the response status code based on the error type
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Send the error response
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
}
