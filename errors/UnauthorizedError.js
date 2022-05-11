class UnauthorizedError extends Error {
  constructor(message = 'Неправильные email или пароль') {
    super(message);
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
