const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, next) => {
		next(null, './src/files');
	},
	filename: (req, file, next) => {
		let filename = '';
		req.body.name
			? (filename = `${req.body.name}_${Date.now()}_${
					file.fieldname
			  }.${file.mimetype.split('/')[1]}`)
			: file.originalname.includes('_')
			? (filename = `${
					file.originalname.split('_')[0]
			  }_${Date.now()}_${file.fieldname}.${
					file.mimetype.split('/')[1]
			  }`)
			: (filename = `${
					file.originalname.split('.')[0]
			  }_${Date.now()}_${file.fieldname}.${
					file.mimetype.split('/')[1]
			  }`);

		next(null, filename);
	}
});

const fileFilter = (req, file, next) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/png'
	) {
		next(null, true);
	} else {
		next(null, false);
	}
};

module.exports = multer({
	storage,
	fileFilter
}).single('picture');
