const { unlinkSync } = require('fs');

const { hostServer, portServer } = require('../config');

const {
	createNewCharacter,
	updateCharacter,
	removeCharacter,
	getAllCharacters,
	getCharacterDetails
} = require('../storage/character.storage');

const register = async (dataNewCharacter, file, { errors }) => {
	try {
		if (errors.length > 0) {
			unlinkSync(`src/files/${file}`);
			throw new Error(errors);
		}

		dataNewCharacter.picture = `${hostServer}:${portServer}/files/${file}`;

		const newCharacter = await createNewCharacter(
			dataNewCharacter
		);

		if (newCharacter.error) {
			unlinkSync(`src/files/${file}`);
			throw new Error(newCharacter.error);
		}

		return newCharacter;
	} catch (error) {
		return { error: error.message };
	}
};

const update = async (dataCharacter, id, file, { errors }) => {
	try {
		if (errors.length > 0) throw new Error(errors);

		if (file) {
			dataCharacter.picture = `${hostServer}:${portServer}/files/${file}`;
		}

		const modifiedCharacter = await updateCharacter(
			dataCharacter,
			id
		);

		if (modifiedCharacter.error) {
			throw new Error(modifiedCharacter.error);
		}

		return modifiedCharacter;
	} catch (error) {
		return { error: error.message };
	}
};

const remove = async (id, { errors }) => {
	if (errors.length > 0) throw new Error(errors);

	const deleteCharacter = await removeCharacter(id);

	if (deleteCharacter.error) {
		throw new Error(deleteCharacter.error);
	}

	return deleteCharacter;
};

const list = async () => await getAllCharacters();

const details = async (id, { errors }) => {
	if (errors.length > 0) throw new Error(errors);

	const character = await getCharacterDetails(id);

	if (character.error) throw new Error(character.error);

	return character;
};

module.exports = { register, update, remove, list, details };
