const { createTransport } = require('nodemailer');
const { email, emailHost, emailPassword } = require('../config');

module.exports = (destiny) => {
	const transporter = createTransport({
		service: 'gmail',
		host: emailHost,
		auth: {
			user: email,
			pass: emailPassword
		}
	});
	const mailOptions = {
		from: email,
		to: destiny,
		subject: 'New Account in Disney API',
		text: '<h1>your account has been created successfully</h1>'
	};
	transporter.sendMail(mailOptions, (error, info) =>
		error
			? console.error(error)
			: console.log(`mail submit: ${info.response}`)
	);
};
