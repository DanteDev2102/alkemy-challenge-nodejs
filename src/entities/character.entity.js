module.exports = (sequelize, type) => {
	return sequelize.define(
		'character',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: type.STRING(60),
				allowNull: false,
				unique: true
			},
			age: {
				type: type.INTEGER,
				allowNull: false,
				validate: {
					min: 1
				}
			},
			history: {
				type: type.TEXT,
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
