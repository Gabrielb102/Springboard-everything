// Error handler which provides more detail

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
    }
  }

class UnauthorizedError extends Error {
  constructor(message = "Not authorized to view this page.", status = 401) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}

class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

module.exports = {
  ExpressError,
  UnauthorizedError,
  BadRequestError
};