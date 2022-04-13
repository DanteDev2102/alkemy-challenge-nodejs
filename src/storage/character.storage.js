const { Character } = require('../database');

const createNewCharacter = async (dataNewCharacter) => {
	try {
		const newCharacter = await Character.create({
			...dataNewCharacter
		});
		return newCharacter;
	} catch (error) {
		return error.message;
	}
};

module.exports = { createNewCharacter };
