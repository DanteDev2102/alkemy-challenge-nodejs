const { static } = require('express');
const { join } = require('path');
const characterRouter = require('../routes/character.routes');
const userRouter = require('../routes/user.routes');

module.exports = (server) => {
	server.use('/characters', characterRouter);
	server.use('/auth', userRouter);
	server.use('/files', static(join(__dirname, '../files')));
};
