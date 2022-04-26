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
		if (errors.length) {
			unlinkSync(`src/files/${file}`);
			throw new Error(errors);
		}

		if (!dataNewCharacter.moviesCharacter.length) {
			throw new Error('movies is empy');
		}

		if (file) {
			dataNewCharacter.picture = `${hostServer}:${portServer}/files/${file}`;
		} else {
			dataNewCharacter.picture = `${hostServer}:${portServer}/files/default.png`;
			file = 'default.png';
		}

		const moviesFormated = new Set(
			dataNewCharacter.moviesCharacter
		);
		dataNewCharacter.moviesCharacter = [...moviesFormated];

		const newCharacter = await createNewCharacter(
			dataNewCharacter
		);

		if (newCharacter.error) {
			unlinkSync(`src/files/${file}`);
			throw new Error(newCharacter.error);
		}

		return newCharacter;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
};

const update = async (dataCharacter, id, file, { errors }) => {
	try {
		if (errors.length) throw new Error(errors);

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
	try {
		if (errors.length) throw new Error(errors);

		const deleteCharacter = await removeCharacter(id);

		if (deleteCharacter.error) {
			throw new Error(deleteCharacter.error);
		}

		return deleteCharacter;
	} catch (error) {
		return { error: error.message };
	}
};

const list = async (filters, { errors }) => {
	try {
		if (errors.length) throw new Error(errors);
		const characters = await getAllCharacters(filters);

		if (characters.error) throw new Error(characters.error);

		return characters;
	} catch (error) {
		return { error: error.message };
	}
};

const details = async (id, { errors }) => {
	try {
		if (errors.length) throw new Error(errors);

		const character = await getCharacterDetails(id);

		if (character.error) throw new Error(character.error);

		return character;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { register, update, remove, list, details };
