const app = require('./app');
const { portServer, hostServer } = require('./config');
const { databaseConnect } = require('./database');

app.listen(portServer, () => {
	databaseConnect();
	console.log(`server listening on port ${portServer}`);
	console.log(`running in ${hostServer}:${portServer}`);
});

process.on('uncaughtException', (error) => {
	console.error(`[uncaugth exception] ${error}`);
});
