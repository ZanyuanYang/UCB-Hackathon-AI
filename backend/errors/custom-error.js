import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message = 'Something went wrong') {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default CustomError;
