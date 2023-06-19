import CustomError from '../errors/custom-error.js';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    errors: [{ message: err.toString() }],
  });
};

export default errorHandler;
