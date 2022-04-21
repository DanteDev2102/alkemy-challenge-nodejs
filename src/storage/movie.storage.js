const { Movie } = require('../database');

const createNewMovie = async (dataNewMovie) => {
	try {
		const [{ dataValues }, created] = await Movie.findOrCreate({
			where: { title: dataNewMovie.title },
			defaults: { ...dataNewMovie }
		});

		if (!created) {
			throw new Error('movie already exist');
		}

		return dataValues;
	} catch (error) {
		return { error: error.message };
	}
};

const getAllMovies = async () => {
	try {
		const allMovies = await Movie.findAll({
			attributes: ['title', 'picture', 'creationDate']
		});

		return allMovies;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { createNewMovie, getAllMovies };
