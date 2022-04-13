const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { register } = require('../services/character.service');
const __FilterFiles = require('../middlewares/FilterFiles.middleare');

const routes = Router();

routes.post(
	'/',
	[
		__FilterFiles,
		body('name').isAlpha(),
		body('age').isInt(),
		body('history').isString()
	],
	async (req, res) => {
		try {
			const file = req.file.filename;
			const dataNewCharacter = req.body;
			const errors = validationResult(req);
			const newUser = await register(
				dataNewCharacter,
				file,
				errors
			);
			return res.status(201).send(newUser);
		} catch (error) {
			return res.status(500).send(error);
		}
	}
);

routes.get('/', (req, res) => {
	try {
		const dataNewUser = req.body;
		return res.status(201).send(newUser);
	} catch (error) {
		return res.status(500).send(error);
	}
});

module.exports = routes;
