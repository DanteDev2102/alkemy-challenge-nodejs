module.exports = (sequelize, type) => {
	return sequelize.define(
		'user',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: type.STRING(60),
				allowNull: false
			},
			password: {
				type: type.STRING,
				allowNull: false
			},
			email: {
				type: type.STRING(100),
				allowNull: false
			}
		},
		{ timestamps: false, underscored: true }
	);
};
