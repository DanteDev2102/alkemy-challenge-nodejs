const { static } = require('express');
const { join } = require('path');
const characterRouter = require('../routes/character.routes');
const userRouter = require('../routes/user.routes');
const movieRouter = require('../routes/movie.routes');
const { __auth } = require('../middlewares/auth.middleware');

module.exports = (server) => {
	server.use('/auth', userRouter);
	server.use('/characters', __auth, characterRouter);
	server.use('/movies', __auth, movieRouter);
	server.use('/files', __auth, static(join(__dirname, '../files')));
};
