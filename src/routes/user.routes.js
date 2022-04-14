const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/user.service');

const routes = Router();

routes.post(
	'/register',
	[
		body('username').trim().isAlphanumeric().escape(),
		body('password').trim().isStrongPassword().escape(),
		body('passwordConfirm').trim().isStrongPassword().escape(),
		body('email').trim().isEmail().normalizeEmail().escape()
	],
	async (req, res) => {
		try {
			const dataNewUser = req.body;
			const errors = validationResult(req);
			const newUser = await register(dataNewUser, errors);
			res.status(201).send(newUser);
		} catch (error) {
			error.msg
				? res.status(400).send(error)
				: Array.isArray(error)
				? res.status(400).send(error)
				: error === 'passwords are different'
				? res.status(400).send(error)
				: error === 'user already exists'
				? res.status(417).send(error)
				: res.status(500).send(error);
		}
	}
);

routes.put(
	'/login',
	[
		body('username').isAlphanumeric().trim().escape(),
		body('password').isStrongPassword().trim().escape()
	],
	async (req, res) => {
		try {
			const dataUser = req.body;
			const errors = validationResult(req);
			const User = await login(dataUser, errors);
			res.status(200).send(User);
		} catch (error) {
			error.msg
				? res.status(400).send(error)
				: Array.isArray(error)
				? res.status(400).send(error)
				: error === 'wrong username or password'
				? res.status(401).send(error)
				: res.status(500).send(error);
		}
	}
);

module.exports = routes;
