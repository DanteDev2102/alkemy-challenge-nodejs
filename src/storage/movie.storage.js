const path = require('path');
const { Op } = require('sequelize');
const {
	Movie,
	Character,
	CharacterMovie,
	Gender
} = require('../database');
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

const getAllMovies = async ({
	genre = '',
	order = 'ASC',
	title = ''
}) => {
	try {
		let allMovies;

		if (!genre) {
			allMovies = await Movie.findAll({
				attributes: ['title', 'picture', 'creationDate'],
				where: { title: { [Op.like]: `%${title}%` } },
				order: [['creationDate', order.toUpperCase()]]
			});
		} else {
			allMovies = await Movie.findAll({
				attributes: ['title', 'picture', 'creationDate'],
				where: { title: { [Op.like]: `%${title}%` } },
				include: [
					{
						model: Gender,
						attributes: []
					}
				],
				order: [['creationDate', order.toUpperCase()]]
			});
		}

		return allMovies;
	} catch (error) {
		console.log(error);
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

const updateMovie = async (dataMovie, id) => {
	try {
		const findMovie = await Movie.findOne({
			where: { id }
		});

		if (!findMovie) throw new Error('not exist Movie');

		const updateMovie = {
			...findMovie.dataValues,
			...dataMovie
		};

		if (dataMovie.picture) {
			const file = findMovie.dataValues.picture
				.split('/')
				.at(-1);

			unlinkSync(path.join(__dirname, '../files', file));
		}

		await findMovie.set(updateMovie);
		await findMovie.save();

		return findMovie;
	} catch (error) {
		return { error: error.message };
	}
};

const getMovieDetails = async (id) => {
	try {
		const movie = await Movie.findByPk(id, {
			include: [
				{
					model: CharacterMovie,
					attributes: ['characterId'],
					include: {
						model: Character,
						attributes: [
							'name',
							'age',
							'history',
							'picture'
						]
					}
				}
			]
		});

		return movie;
	} catch (error) {
		return { error: error.message };
	}
};
module.exports = {
	createNewMovie,
	getAllMovies,
	removeMovie,
	updateMovie,
	getMovieDetails
};
