const moment = require('moment');
const { decodeToken } = require('../utils/jwt.utils');

const ensureAuth = (req, res, next) => {
	if (!req.headers.authorization)
		return res
			.status(403)
			.send({ error: 'Invalid authorization' });

	const token = req.headers.authorization;

	const payload = decodeToken(token);

	try {
		if (payload.exp <= moment().unix())
			return res.status(400).send({ error: 'TOKEN EXPIRED' });
	} catch (err) {
		return res.status(404).send({ error: 'Invalid Token' });
	}

	req.user = payload;
	next();
};

module.exports = { __auth: ensureAuth };
