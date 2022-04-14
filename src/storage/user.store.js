const { compare } = require('bcryptjs');
const { User } = require('../database');

const createNewUser = async (dataNewUser) => {
	try {
		const { email, username } = dataNewUser;

		const isExistEmail = await User.findOne({ where: { email } });
		if (isExistEmail) throw new Error('user already exists');

		const isExistUsername = await User.findOne({
			where: { username }
		});

		if (isExistUsername) throw new Error('user already exists');

		const { dataValues } = await User.create(dataNewUser);

		delete dataValues.password;

		return dataValues;
	} catch (error) {
		return { error: error.message };
	}
};

const confirmUser = async ({ username, password }) => {
	try {
		const isExistUser = await User.findOne({
			where: { username }
		});

		if (!isExistUser)
			throw new Error('wrong username or password');

		const isCorrectPassword = compare(
			password,
			isExistUser.dataValues.password
		);

		if (!isCorrectPassword)
			throw new Error('wrong username or password');

		delete isExistUser.dataValues.password;

		return isExistUser.dataValues;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { createNewUser, confirmUser };
