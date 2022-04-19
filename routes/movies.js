const router = require('express').Router();
const { getMovies } = require('../controllers/movie');

router.get('/movies', getMovies);
router.post('/movies', () => console.log('test'));
router.delete('/movies/:id', () => console.log('test'));

module.exports = router;