const { compare } = require('bcryptjs');
const { User } = require('../database');
const { Op } = require('sequelize');

const createNewUser = async ({ email, username, password }) => {
	try {
		const [{ dataValues }, created] = await User.findOrCreate({
			where: {
				[Op.or]: [{ email }, { username }]
			},
			defaults: {
				email,
				password,
				username
			}
		});

		if (!created) throw new Error('user already exist');

		delete dataValues.password;

		return dataValues;
	} catch (error) {
		return { error: error.message };
	}
};

const confirmUser = async ({ username, password }) => {
	try {
		const { dataValues } = await User.findOne({
			where: { username }
		});

		if (!dataValues) {
			throw new Error('wrong username or password');
		}

		const isCorrectPassword = compare(
			password,
			dataValues.password
		);

		if (!isCorrectPassword) {
			throw new Error('wrong username or password');
		}

		delete dataValues.password;

		return dataValues;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { createNewUser, confirmUser };
