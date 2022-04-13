const { unlinkSync } = require('fs');

const { hostServer, portServer } = require('../config');

const {
	createNewCharacter
} = require('../storage/character.storage');

const register = (dataNewCharacter, file, { errors }) => {
	if (errors.length > 0) {
		unlinkSync(`src/files/${file}`);
		return Promise.reject(errors);
	}

	if (file) {
		dataNewCharacter.picture = `${hostServer}:${portServer}/files/${file}`;
	}

	return Promise.resolve(createNewCharacter(dataNewCharacter));
};

module.exports = { register };
