const { Router } = require('express');
const {
	body,
	param,
	query,
	validationResult
} = require('express-validator');
const {
	register,
	list,
	remove,
	update,
	details
} = require('../services/movie.service');
const __FilterFiles = require('../middlewares/FilterFiles.middleware');

const routes = Router();

routes.post(
	'/',
	[
		__FilterFiles,
		body('title').isString().trim().escape(),
		body('creationDate').isDate(),
		body('score').isInt(),
		body('gender_id').trim().isInt()
	],
	async (req, res) => {
		try {
			const file = req.file?.filename;
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

routes.get(
	'/',
	[
		query('title').trim().isAlpha().optional(),
		query('genre').trim().isInt().optional(),
		query('order').trim().isAlpha().optional()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			const filters = req.query;
			const getAll = await list(filters, errors);
			res.json(getAll);
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

routes.delete(
	'/:id',
	param('id').trim().isInt(),
	async (req, res) => {
		try {
			const { id } = req.params;
			const errors = validationResult(req);
			const deleteMovie = await remove(id, errors);
			res.json(deleteMovie);
		} catch (error) {
			error.msg
				? res.status(400).json(error.msg)
				: res.status(500).json(error);
		}
	}
);

routes.put(
	'/:id',
	[
		body('title').isAlpha().trim().escape().optional(),
		body('creationDate').trim().isDate().optional(),
		body('score').isInt().trim().optional(),
		param('id').trim().isInt(),
		__FilterFiles
	],
	async (req, res) => {
		try {
			const dataMovie = req.body;
			const file = req.file?.filename;
			const { id } = req.params;
			const errors = validationResult(req);
			const updateMovie = await update(
				dataMovie,
				file,
				id,
				errors
			);
			res.status(200).json(updateMovie);
		} catch (error) {
			error.msg
				? res.status(400).json(error.msg)
				: Array.isArray(error)
				? res.status(400).json(error)
				: res.status(500).json(error);
		}
	}
);

routes.get('/:id', param('id').trim().isInt(), async (req, res) => {
	try {
		const { id } = req.params;
		const errors = validationResult(req);
		const movie = await details(id, errors);
		res.json(movie);
	} catch (error) {
		error.msg
			? res.status(400).json(error.msg)
			: res.status(500).json(error);
	}
});

module.exports = routes;
