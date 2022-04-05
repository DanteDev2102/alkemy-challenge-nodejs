const { hash } = require('bcryptjs');
const { User } = require('../database');

const register = (dataNewUser, { errors }) => {
	return new Promise((resolve, reject) => {
		if (errors.length > 0) {
			reject(errors);
			return;
		}

		const { password, passwordConfirm, email } = dataNewUser;
		if (password !== passwordConfirm) {
			reject('passwords are different');
			return;
		}

		delete dataNewUser.passwordConfirm;

		hash(password, 10, (error, hash) => {
			if (error) return;
			dataNewUser.password = hash;
			resolve(dataNewUser);
		});
	});
};

module.exports = { register };
