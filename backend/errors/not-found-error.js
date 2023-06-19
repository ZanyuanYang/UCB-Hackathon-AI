import CustomError from './custom-error.js';
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  constructor(message = 'Resource not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
