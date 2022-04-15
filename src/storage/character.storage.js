const { unlinkSync } = require('fs');
const path = require('path');
const { Character } = require('../database');

const createNewCharacter = async (dataNewCharacter) => {
	try {
		const [{ dataValues }, created] =
			await Character.findOrCreate({
				where: { name: dataNewCharacter.name },
				defaults: { ...dataNewCharacter }
			});

		if (!created) {
			throw new Error('character already exist');
		}

		return dataValues;
	} catch (error) {
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
			...dataCharacter
		};

		if (dataCharacter.picture) {
			const file = findCharacter.dataValues.picture
				.split('/')
				.at(-1);

			unlinkSync(path.join(__dirname, '../files', file));
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

		unlinkSync(path.join(__dirname, '../files', file));

		const deleteCharacter = await character.destroy();

		return deleteCharacter;
	} catch (error) {
		return { error: error.message };
	}
};

const getAllCharacters = async () => {
	try {
		const allCharacters = await Character.findAll({
			attributes: ['name', 'picture']
		});

		return allCharacters;
	} catch (error) {
		return { error: error.message };
	}
};

const getCharacterDetails = async (id) => {
	try {
		const character = await Character.findByPk(id);

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
