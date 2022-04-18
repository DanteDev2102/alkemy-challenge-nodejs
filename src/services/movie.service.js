const { createNewMovie } = require('../storage/movie.storage');
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

	console.log('morite');
	const newMovie = await createNewMovie(dataNewMovie);

	if (newMovie.error) {
		unlinkSync(`src/files/${file}`);
		return Promise.reject(newMovie.error);
	}

	return newMovie;
};

module.exports = { register };
