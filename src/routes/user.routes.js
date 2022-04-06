const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/user.service');

const routes = Router();

routes.post(
	'/register',
	[
		body('username').isAlphanumeric(),
		body('password').isStrongPassword(),
		body('passwordConfirm').isStrongPassword(),
		body('email').isEmail()
	],
	async (req, res) => {
		try {
			const dataNewUser = req.body;
			const errors = validationResult(req);
			const newUser = await register(dataNewUser, errors);
			res.status(200).send(newUser);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

routes.put(
	'/login',
	[
		body('username').isAlphanumeric(),
		body('password').isStrongPassword()
	],
	async (req, res) => {
		try {
			const dataUser = req.body;
			const errors = validationResult(req);
			const User = await login(dataUser, errors);
			res.status(200).send(User);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

module.exports = routes;
