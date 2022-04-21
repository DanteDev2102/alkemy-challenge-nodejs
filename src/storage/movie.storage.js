const path = require('path');
const { Movie } = require('../database');
const { unlinkSync } = require('fs');

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

const removeMovie = async (id) => {
	try {
		const movie = await Movie.findOne({
			where: { id }
		});

		if (!movie) throw new Error('not exist Movie');

		const file = movie.dataValues.picture.split('/').at(-1);

		unlinkSync(path.join(__dirname, '../files', file));

		const deleteMovie = await movie.destroy();

		return deleteMovie;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { createNewMovie, getAllMovies, removeMovie };
