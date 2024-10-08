export function errorHandler(err, req, res, next) {
    console.log(err);

    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'internal server error';

    res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage
    });
}