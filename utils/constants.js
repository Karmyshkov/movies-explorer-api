const BAD_REQUEST_MOVIE = 'Переданы некорректные данные при добавлении фильма';
const BAD_REQUEST_AUTH = 'Переданы некорректные данные при регистрации';
const BAD_REQUEST_USER = 'Переданы некорректные данные при обновлении профиля';
const NOT_FOUND_MOVIE = 'Фильм с указанным id не найдена';
const NOT_FOUND_USER = 'Пользователь с указанным _id не найден';
const NO_RIGHTS = 'У вас нету прав';
const SUCCESS_SIGNIN = 'Вы вошли в систему';
const SUCCESS_SIGNOUT = 'Успешно вышли из системы';
const CONFLICT_EMAIL = 'Указанная почта используется';
const CONFLICT_USER_DATA = 'Введены старые данные';

const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://api.karmyskov-cinema.nomoredomains.work',
  'https://karmyskov-cinema-explorer.nomoredomains.work',
];

module.exports = {
  BAD_REQUEST_MOVIE,
  BAD_REQUEST_AUTH,
  BAD_REQUEST_USER,
  NOT_FOUND_MOVIE,
  NOT_FOUND_USER,
  NO_RIGHTS,
  SUCCESS_SIGNIN,
  SUCCESS_SIGNOUT,
  CONFLICT_EMAIL,
  ALLOWED_CORS,
  CONFLICT_USER_DATA,
};
