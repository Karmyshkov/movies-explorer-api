class NotFoundError extends Error {
  constructor(message = 'Страница не найдена') {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;
