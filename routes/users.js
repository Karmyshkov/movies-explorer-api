const router = require('express').Router();
const { getUserInfo, editProfile } = require('../controllers/user');

router.get('/users/me', getUserInfo);
router.patch('/users/me', editProfile);

module.exports = router;