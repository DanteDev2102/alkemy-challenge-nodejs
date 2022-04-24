const { hash } = require('bcryptjs');
const {
	createNewUser,
	confirmUser
} = require('../storage/user.store');
const { createToken } = require('../utils/jwt.utils');
const sendMail = require('../utils/sendMail.utils');

const register = async (dataNewUser, { errors }) => {
	if (errors.length > 0) throw new Error(errors);

	const { password, passwordConfirm, email } = dataNewUser;

	if (password !== passwordConfirm) {
		throw new Error('passwords are different');
	}

	delete dataNewUser.passwordConfirm;

	try {
		dataNewUser.password = await hash(password, 10);
	} catch (error) {
		throw new Error(error.message);
	}

	const newUser = await createNewUser(dataNewUser);
	if (newUser.error) throw new Error(newUser.error);

	const token = createToken(newUser, '10h');
	sendMail(email);

	return {
		message: 'user created successfully',
		data: { ...newUser },
		token
	};
};

const login = async (dataUser, { errors }) => {
	if (errors.length > 0) throw new Error(errors);

	const User = await confirmUser(dataUser);
	if (User.error) throw new Error(User.error);

	const token = createToken(User, '10h');

	return {
		message: 'successfully authenticated user',
		data: { ...User },
		token
	};
};

module.exports = { register, login };
