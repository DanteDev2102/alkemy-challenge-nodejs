module.exports = (sequelize, type) => {
	return sequelize.define(
		'gender',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: type.STRING(60),
				allowNull: false
			},
			picture: {
				type: type.STRING,
				allowNull: false
			}
		},
		{ timestamps: false, underscored: true }
	);
};
