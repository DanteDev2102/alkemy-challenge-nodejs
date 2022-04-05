const characterRouter = require('../routes/character.routes');
const userRouter = require('../routes/user.routes');

module.exports = (server) => {
	server.use('/characters', characterRouter);
	server.use('/auth', userRouter);
};
