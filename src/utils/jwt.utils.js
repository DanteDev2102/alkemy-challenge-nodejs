const jwt = require('jsonwebtoken');
const { secret_key_jwt } = require('../config');

const createToken = (user, expiresIn) => {
	return jwt.sign(user, secret_key_jwt, { expiresIn });
};

const decodeToken = (token) => {
	return jwt.decode(token, secret_key_jwt);
};

module.exports = {
	createToken,
	decodeToken
};
