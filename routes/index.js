const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signin, signup, signout } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const { signinValidate, signupValidate } = require('../middlewares/validation');

router.post('/signin', signinValidate, signin);
router.post('/signup', signupValidate, signup);
router.get('/signout', auth, signout);

router.use('/', auth, require('./users'));
router.use('/', auth, require('./movies'));

router.use(auth, () => {
  throw new NotFoundError();
});

module.exports = router;
