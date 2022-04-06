const { hash } = require('bcryptjs');
const { createNewUser } = require('../storage/user.store');
const { createToken } = require('../utils/jwt.utils');
const sendMail = require('../utils/sendMail.utils');

const register = async (dataNewUser, { errors }) => {
	if (errors.length > 0) return Promise.reject(errors);

	const { password, passwordConfirm, email } = dataNewUser;

	if (password !== passwordConfirm)
		return Promise.reject('passwords are different');

	delete dataNewUser.passwordConfirm;
	dataNewUser.password = await hash(password, 10);

	const newUser = await createNewUser(dataNewUser);
	if (newUser.error) return Promise.reject(newUser.error);

	const token = createToken(newUser, '10h');
	sendMail(email);

	return Promise.resolve({
		message: 'user created successfully',
		data: { ...newUser },
		token
	});
};

const login = async (dataUser) => {
	console.log(dataUser);
};

module.exports = { register, login };
