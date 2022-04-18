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

module.exports = { createNewMovie };
