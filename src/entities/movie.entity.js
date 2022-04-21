module.exports = (sequelize, type) => {
	return sequelize.define(
		'movie',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: type.STRING(60),
				allowNull: false
			},
			picture: {
				type: type.STRING,
				allowNull: false
			},
			creationDate: {
				type: type.DATE,
				allowNull: false
			},
			score: {
				type: type.INTEGER,
				allowNull: false
			}
		},
		{ timestamps: false, underscored: true }
	);
};
