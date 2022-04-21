const {
	createNewMovie,
	getAllMovies,
	removeMovie,
	updateMovie
} = require('../storage/movie.storage');
const { hostServer, portServer } = require('../config');
const { unlinkSync } = require('fs');

const register = async (dataNewMovie, file, { errors }) => {
	if (errors.length > 0) {
		unlinkSync(`src/files/${file}`);
		return Promise.reject(errors);
	}
	const { score } = dataNewMovie;

	if (score < 1 || score > 5) {
		return Promise.reject('invalid score');
	}

	dataNewMovie.picture = `${hostServer}:${portServer}/files/${file}`;

	const newMovie = await createNewMovie(dataNewMovie);

	if (newMovie.error) {
		unlinkSync(`src/files/${file}`);
		return Promise.reject(newMovie.error);
	}

	return newMovie;
};

const remove = async (id, { errors }) => {
	if (errors.length > 0) return Promise.reject(errors);

	const deleteMovie = await removeMovie(id);

	if (deleteMovie.error) {
		return Promise.reject(deleteMovie.error);
	}

	return Promise.resolve(deleteMovie);
};

const update = async (dataMovie, file, id, { errors }) => {
	if (errors.length > 0) return Promise.reject(errors);

	if (file) {
		dataMovie.picture = `${hostServer}:${portServer}/files/${file}`;
	}
	const modifiedMovie = await updateMovie(dataMovie, id);

	if (modifiedMovie.error) {
		Promise.reject(modifiedMovie.error);
	}

	return Promise.resolve(modifiedMovie);
};

const list = async () => Promise.resolve(await getAllMovies());

module.exports = { register, list, remove, update };
