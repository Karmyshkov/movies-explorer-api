const router = require('express').Router();
const { getMovies, addMovie } = require('../controllers/movie');

router.get('/movies', getMovies);
router.post('/movies', addMovie);
router.delete('/movies/:id', () => console.log('test'));

module.exports = router;