require('dotenv').config();

const config = {
	// server
	portServer: process.env.PORT_SERVER || 3001,
	hostServer: process.env.HOST_SERVER || 'http://localhost',

	// database
	dbName: process.env.DB_NAME || 'disney',
	dbUser: process.env.DB_USER || 'root',
	dbPassword: process.env.DB_PASSWORD || '123456', // solo en mi local
	dbHost: process.env.DB_HOST || 'localhost',
	dbDialect: 'mysql',

	// email
	email: process.env.EMAIL,
	emailPassword: process.env.EMAIL_PASSWORD,
	emailHost: process.env.EMAIL_HOST,

	//jwt
	secret_key_jwt:
		process.env.SECRET_KEY_JWT || 'this is a secret, shhhh...'
};

module.exports = config;
