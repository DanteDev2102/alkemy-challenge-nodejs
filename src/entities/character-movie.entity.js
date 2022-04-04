module.exports = (sequelize, type) => {
	return sequelize.define(
		'character-movie',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		},
		{ timestamps: false, underscored: true }
	);
};
