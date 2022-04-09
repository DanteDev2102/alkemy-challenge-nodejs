const { decodeToken } = require('../utils/jwt.utils');

const ensureAuth = (req, res, next) => {
	if (!req.headers.authorization)
		return res
			.status(403)
			.send({ error: 'Invalid authorization' });

	const token = req.headers.authorization;

	const payload = decodeToken(token);

	try {
		if (payload.exp <= Math.round(Date.now() / 1000))
			return res.status(400).send({ error: 'TOKEN EXPIRED' });
	} catch (err) {
		return res.status(404).send({ error: 'Invalid Token' });
	}

	req.user = payload;
	next();
};

module.exports = { __auth: ensureAuth };
