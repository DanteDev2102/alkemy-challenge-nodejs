const characterRouter = require('../routes/character.routes');

module.exports = (server) => {
	server.use('/characters', characterRouter);
};
