const { unlinkSync } = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const { Character, CharacterMovie, Movie } = require('../database');
const { sequelize } = require('../database');

const createNewCharacter = async ({
	name,
	age,
	history,
	picture,
	weight,
	moviesCharacter
}) => {
	const transaction = await sequelize.transaction();

	try {
		const { dataValues } = await Character.create(
			{ name, age, history, picture, weight: `${weight}kg` },
			{ transaction }
		);

		const movies = moviesCharacter.map((movie) => ({
			characterId: dataValues.id,
			movieId: movie
		}));

		await CharacterMovie.bulkCreate(movies, { transaction });

		await transaction.commit();

		return dataValues;
	} catch (error) {
		await transaction.rollback();
		return { error: error.message };
	}
};

const updateCharacter = async (dataCharacter, id) => {
	try {
		const findCharacter = await Character.findOne({
			where: { id }
		});

		if (!findCharacter) throw new Error('not exist character');

		const updateCharacter = {
			...findCharacter.dataValues,
			...dataCharacter,
			weigth: `${
				dataCharacter.weight || findCharacter.weight
			}kg`
		};

		if (dataCharacter.picture) {
			const file = findCharacter.dataValues.picture
				.split('/')
				.at(-1);

			if (file !== 'default.png') {
				unlinkSync(path.join(__dirname, '../files', file));
			}
		}

		await findCharacter.set(updateCharacter);
		await findCharacter.save();

		return findCharacter;
	} catch (error) {
		return { error: error.message };
	}
};

const removeCharacter = async (id) => {
	try {
		const character = await Character.findOne({
			where: { id }
		});

		if (!character) throw new Error('not exist character');

		const file = character.dataValues.picture.split('/').at(-1);

		if (file !== 'default.png') {
			unlinkSync(path.join(__dirname, '../files', file));
		}

		const deleteCharacter = await character.destroy();

		return deleteCharacter;
	} catch (error) {
		return { error: error.message };
	}
};

const getAllCharacters = async ({ movieId, age, name = '' }) => {
	try {
		let allCharacters;

		if (!movieId && !age) {
			allCharacters = await Character.findAll({
				attributes: ['name', 'picture'],
				where: {
					name: { [Op.like]: `%${name}%` }
				}
			});
		} else if (!age && movieId) {
			allCharacters = await Character.findAll({
				attributes: ['name', 'picture'],
				where: {
					name: { [Op.like]: `%${name}%` }
				},
				include: [
					{
						model: CharacterMovie,
						attributes: [],
						where: { movieId }
					}
				]
			});
		} else if (age && !movieId) {
			allCharacters = await Character.findAll({
				attributes: ['name', 'picture'],
				where: {
					name: { [Op.like]: `%${name}%` },
					age
				}
			});
		} else {
			allCharacters = await Character.findAll({
				attributes: ['name', 'picture'],
				where: {
					name: { [Op.like]: `%${name}%` },
					age
				},
				include: [
					{
						model: CharacterMovie,
						attributes: [],
						where: { movieId }
					}
				]
			});
		}
		return allCharacters;
	} catch (error) {
		return { error: error.message };
	}
};

const getCharacterDetails = async (id) => {
	try {
		const character = await Character.findByPk(id, {
			include: [
				{
					model: CharacterMovie,
					attributes: ['movieId'],
					include: {
						model: Movie,
						attributes: [
							'title',
							'picture',
							'creationDate',
							'score'
						]
					}
				}
			]
		});

		return character;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = {
	createNewCharacter,
	updateCharacter,
	removeCharacter,
	getAllCharacters,
	getCharacterDetails
};
