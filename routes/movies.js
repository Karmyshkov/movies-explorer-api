const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movie');
const { movieIdValidate, addMovieValidate } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', addMovieValidate, addMovie);
router.delete('/movies/:movieId', movieIdValidate, deleteMovie);

module.exports = router;