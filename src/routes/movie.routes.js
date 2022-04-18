const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { register } = require('../services/movie.service');
const __FilterFiles = require('../middlewares/FilterFiles.middleware');
const __optionalFile = require('../middlewares/optionalFile.middleware');
const res = require('express/lib/response');

const routes = Router();

routes.post(
	'/',
	[
		__FilterFiles,
		body('title').isString().trim().escape(),
		body('creationDate').isDate(),
		body('score').isInt()
	],
	async (req, res) => {
		try {
			const file = req.file.filename;
			const dataNewMovie = req.body;
			const errors = validationResult(req);
			const newMovie = await register(
				dataNewMovie,
				file,
				errors
			);
			res.status(201).json(newMovie);
		} catch (error) {
			error.msg
				? res.status(400).json(error.msg)
				: Array.isArray(error)
				? res.status(400).json(error)
				: error === 'movie already exist'
				? res.status(417).json(error)
				: res.status(500).json(error);
		}
	}
);

routes.get('/', (req, res) => res.json({ msg: 'hola' }));

module.exports = routes;
