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

module.exports = { createNewUser };
