const router = require('express').Router();
const { getUserInfo } = require('../controllers/user');

router.get('/users/me', getUserInfo);
router.patch('/users/me', () => console.log('test'));

module.exports = router;