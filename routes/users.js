const router = require('express').Router();
const { getCurrentUser } = require('../controllers/user');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', () => console.log('test'));

module.exports = router;