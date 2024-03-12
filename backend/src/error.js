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

// handling validation errors

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.extensions = {
      msg: message,
      code: "VALIDATION_ERROR",
    };
  }
}