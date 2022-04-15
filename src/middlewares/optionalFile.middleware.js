module.exports = (req, res, next) => {
	console.log(req.file);
	if (!req.file) {
		req.file = {
			encoding: '7bit',
			fieldname: 'picture',
			mimetype: 'image/png',
			originalname: 'default.png'
		};
	}
	console.log(req.file);
	next();
};
