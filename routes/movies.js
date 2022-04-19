const router = require('express').Router();

router.get('/movies', () => console.log('test'));
router.post('/movies', () => console.log('test'));
router.delete('/movies/:id', () => console.log('test'));

module.exports = router;