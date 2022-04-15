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
			res.status(201).json(newUser);
		} catch (error) {
			error.msg
				? res.status(400).json(error)
				: Array.isArray(error)
				? res.status(400).json(error)
				: error === 'passwords are different'
				? res.status(400).json(error)
				: error === 'user already exists'
				? res.status(417).json(error)
				: res.status(500).json(error);
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
			res.status(200).json(User);
		} catch (error) {
			error.msg
				? res.status(400).json(error)
				: Array.isArray(error)
				? res.status(400).json(error)
				: error === 'wrong username or password'
				? res.status(401).json(error)
				: res.status(500).json(error);
		}
	}
);

module.exports = routes;
