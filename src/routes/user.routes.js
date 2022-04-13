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
			return res.status(201).send(newUser);
		} catch (error) {
			if (error.msg === 'Invalid value')
				return res.status(400).send(error);
			if (error === 'passwords are different')
				return res.status(400).send(error);
			if (error === 'user already exists')
				return res.status(400).send(error);
			return res.status(500).send(error);
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
