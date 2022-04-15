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
	if (errors.length > 0) {
		unlinkSync(`src/files/${file}`);
		return Promise.reject(errors);
	}

	dataNewCharacter.picture = `${hostServer}:${portServer}/files/${file}`;

	const newCharacter = await createNewCharacter(dataNewCharacter);

	if (newCharacter.error) {
		unlinkSync(`src/files/${file}`);
		return Promise.reject(newCharacter.error);
	}

	return Promise.resolve(newCharacter);
};

const update = async (dataCharacter, id, file, { errors }) => {
	if (errors.length > 0) return Promise.reject(errors);

	if (file) {
		dataCharacter.picture = `${hostServer}:${portServer}/files/${file}`;
	}

	const modifiedCharacter = await updateCharacter(
		dataCharacter,
		id
	);

	if (modifiedCharacter.error) {
		Promise.reject(modifiedCharacter.error);
	}

	return Promise.resolve(modifiedCharacter);
};

const remove = async (id, { errors }) => {
	if (errors.length > 0) return Promise.reject(errors);

	const deleteCharacter = await removeCharacter(id);

	if (deleteCharacter.error) {
		return Promise.reject(deleteCharacter.error);
	}

	return Promise.resolve(deleteCharacter);
};

const list = async () => Promise.resolve(await getAllCharacters());

const details = async (id, { errors }) => {
	if (errors.length > 0) return Promise.reject(errors);

	const character = await getCharacterDetails(id);

	if (character.error) return Promise.reject(character.error);

	return Promise.resolve(character);
};

module.exports = { register, update, remove, list, details };
