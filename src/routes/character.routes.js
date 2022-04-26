const { Router } = require('express');
const {
	body,
	validationResult,
	param
} = require('express-validator');
const {
	register,
	update,
	remove,
	list,
	details
} = require('../services/character.service');
const __FilterFiles = require('../middlewares/FilterFiles.middleware');
const __optionalFile = require('../middlewares/optionalFile.middleware');

const routes = Router();

routes.post(
	'/',
	[
		__FilterFiles,
		body('name').isAlpha().trim().escape(),
		body('age').trim().isInt(),
		body('history').isString().trim().escape()
	],
	async (req, res) => {
		try {
			const file = req.file?.filename;
			const dataNewCharacter = req.body;
			const errors = validationResult(req);
			const newCharacter = await register(
				dataNewCharacter,
				file,
				errors
			);
			res.status(201).json(newCharacter);
		} catch (error) {
			console.log(error);
			error.msg
				? res.status(400).json(error.msg)
				: Array.isArray(error)
				? res.status(400).json(error)
				: error === 'character already exist'
				? res.status(417).json(error)
				: res.status(500).json(error);
		}
	}
);

routes.put(
	'/:id',
	[
		body('name').isAlpha().trim().escape().optional(),
		body('age').trim().isInt().optional(),
		body('history').isString().trim().escape().optional(),
		param('id').trim().isInt(),
		__optionalFile,
		__FilterFiles
	],
	async (req, res) => {
		try {
			const dataCharacter = req.body;
			const { id } = req.params;
			const file = req.file.filename;
			const errors = validationResult(req);
			const updateCharacter = await update(
				dataCharacter,
				id,
				file,
				errors
			);
			res.status(201).json(updateCharacter);
		} catch (error) {
			error.msg
				? res.status(400).json(error.msg)
				: Array.isArray(error)
				? res.status(400).json(error)
				: res.status(500).json(error);
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
			const deleteCharacter = await remove(id, errors);
			res.json(deleteCharacter);
		} catch (error) {
			error.msg
				? res.status(400).json(error.msg)
				: res.status(500).json(error);
		}
	}
);

routes.get('/', async (req, res) => {
	try {
		const getAll = await list();
		res.json(getAll);
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.get('/:id', param('id').trim().isInt(), async (req, res) => {
	try {
		const { id } = req.params;
		const errors = validationResult(req);
		const character = await details(id, errors);
		res.json(character);
	} catch (error) {
		error.msg
			? res.status(400).json(error.msg)
			: res.status(500).json(error);
	}
});

module.exports = routes;
