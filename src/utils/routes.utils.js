const { static } = require('express');
const { join } = require('path');
const characterRouter = require('../routes/character.routes');
const userRouter = require('../routes/user.routes');
const movieRouter = require('../routes/movie.routes');

module.exports = (server) => {
	server.use('/auth', userRouter);
	server.use('/characters', characterRouter);
	server.use('/movie', movieRouter);
	server.use('/files', static(join(__dirname, '../files')));
};
