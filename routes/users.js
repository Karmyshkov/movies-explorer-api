const router = require('express').Router();

router.get('/users/me', () => console.log('test'));
router.patch('/users/me', () => console.log('test'));

module.exports = router;