// Response Middleware
function ResponseMiddleware(req, res, next) {
  res.successResponse = (statusCode, data) => {
    const jsonResponse = {
      statusCode: statusCode,
      success: true,
      data: data,
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode).send(jsonResponse);
  };

  res.errorResponse = (statusCode, message) => {
    const jsonResponse = {
      statusCode: statusCode,
      success: false,
      message: message,
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode).send(jsonResponse);
  };

  next();
}

export default ResponseMiddleware;
