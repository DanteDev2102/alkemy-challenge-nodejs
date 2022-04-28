const Sequelize = require('sequelize');
const CharacterModel = require('./entities/character.entity');
const GenderModel = require('./entities/gender.entity');
const UserModel = require('./entities/user.entity');
const MovieModel = require('./entities/movie.entity');
const CharacterMovieModel = require('./entities/character-movie.entity');

const {
	dbName,
	dbPassword,
	dbUser,
	dbHost: host,
	dbDialect: dialect
} = require('./config');

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host,
	dialect
});

const databaseConnect = () => {
	const authorization = sequelize.authenticate();
	const createTables = sequelize.sync();
	Promise.all([authorization, createTables])
		.then(() => console.log('[db] connected'))
		.catch((error) => {
			console.error(`[db] error: ${error}`);
			process.exit(1);
		});
};

const Character = CharacterModel(sequelize, Sequelize);
const Gender = GenderModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const CharacterMovie = CharacterMovieModel(sequelize, Sequelize);

Character.CharacterMovie = Character.hasMany(CharacterMovie);
CharacterMovie.Character = CharacterMovie.belongsTo(Character);

Movie.CharacterMovie = Movie.hasMany(CharacterMovie);
CharacterMovie.Movie = CharacterMovie.belongsTo(Movie);

Gender.Movie = Gender.hasMany(Movie);
Movie.Gender = Movie.belongsTo(Gender);

module.exports = {
	databaseConnect,
	Character,
	Gender,
	User,
	Movie,
	Character,
	CharacterMovie,
	sequelize
};
