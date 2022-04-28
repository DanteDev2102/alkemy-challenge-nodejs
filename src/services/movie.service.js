const {
	createNewMovie,
	getAllMovies,
	removeMovie,
	updateMovie,
	getMovieDetails
} = require('../storage/movie.storage');
const { hostServer, portServer } = require('../config');
const { unlinkSync } = require('fs');

const register = async (dataNewMovie, file, { errors }) => {
	if (errors.length) {
		unlinkSync(`src/files/${file}`);
		throw new Error(errors);
	}
	const { score } = dataNewMovie;

	if (score < 1 || score > 5) {
		throw new Error('invalid score');
	}

	dataNewMovie.picture = `${hostServer}:${portServer}/files/${file}`;

	const newMovie = await createNewMovie(dataNewMovie);

	if (newMovie.error) {
		unlinkSync(`src/files/${file}`);
		throw new Error(newMovie.error);
	}

	return newMovie;
};

const remove = async (id, { errors }) => {
	if (errors.length) throw new Error(errors);

	const deleteMovie = await removeMovie(id);

	if (deleteMovie.error) {
		throw new Error(deleteMovie.error);
	}

	return deleteMovie;
};

const update = async (dataMovie, file, id, { errors }) => {
	if (errors.length) throw new Error(errors);

	if (file) {
		dataMovie.picture = `${hostServer}:${portServer}/files/${file}`;
	} else {
		dataMovie.picture = `${hostServer}:${portServer}/files/default.png`;
	}
	const modifiedMovie = await updateMovie(dataMovie, id);

	if (modifiedMovie.error) {
		throw new Error(modifiedMovie.error);
	}

	return modifiedMovie;
};

const list = async (filters, { errors }) => {
	try {
		if (errors.length) throw new Error(errors);

		const movies = await getAllMovies(filters);

		if (movies.error) {
			throw new Error(movies.error);
		}

		return movies;
	} catch (error) {
		return { error: error.message };
	}
};

const details = async (id, { errors }) => {
	if (errors.length) throw new Error(errors);

	const movie = await getMovieDetails(id);

	if (movie.error) throw new Error(movie.error);

	return movie;
};

module.exports = { register, list, remove, update, details };
