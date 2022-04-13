const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, next) => {
		next(null, './src/files');
	},
	filename: (req, file, next) => {
		next(
			null,
			`${req.body.name}_${Date.now()}_${file.fieldname}.${
				file.mimetype.split('/')[1]
			}`
		);
	}
});

const fileFilter = (req, file, next) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/png'
	) {
		next(null, true);
	}
};

module.exports = multer({
	storage: storage,
	fileFilter: fileFilter
}).single('picture');
