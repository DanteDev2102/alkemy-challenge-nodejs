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
			img: {
				type: type.BLOB('long'),
				allowNull: false
			}
		},
		{ timestamps: false, underscored: true }
	);
};
