// handling user input errors

export class UserInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserInputError";
    this.extensions = {
      msg: message,
      code: "USER_INPUT_ERROR",
    };
  }
}

// handling authentication errors

export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.extensions = {
      msg: message,
      code: "AUTHENTICATION_ERROR",
    };
  }
}

// handling server errors

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.extensions = {
      msg: message,
      code: "SERVER_ERROR",
    };
  }
}

// handling unexpected errors

export class UnexpectedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnexpectedError";
    this.extensions = {
      msg: message,
      code: "UNEXPECTED_ERROR",
    };
  }
}