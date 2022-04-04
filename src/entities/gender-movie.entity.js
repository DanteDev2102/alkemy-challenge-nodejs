module.exports = (sequelize, type) => {
	return sequelize.define(
		'gender-movie',
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
