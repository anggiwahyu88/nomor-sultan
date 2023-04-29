export function errRes(statusCode, res, msg) {
  res.status(statusCode).json({
    error_message: msg,
  });
}
