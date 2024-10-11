import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  if (isHttpError(error)) {
    return res
      .status(error.statusCode)
      .json({ satus: error.statusCode, message: error.message });
  }

  console.error(error);

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
}
