"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Usuario extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		//TODO se debe crear una tabla para los roles
		static associate(models) {
			Usuario.belongsTo(models.Rol, {
				foreignKey: "RolID",
			});
		}
	}
	//esta funcion se ejecuta antes de crear la tabla y se encarga de crear los campos de la tabla

	Usuario.init(
		{
			nombre: DataTypes.STRING,
			apellido: DataTypes.STRING,
			nombreUsuario: DataTypes.STRING,
			hash: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Usuario",
			tableName: "Usuario",
		}
	);
	
	Usuario.sync({ force: true });
	// la funcion anterior crea la tabla en la base de datos con los campos que le pasemos y luego se ejecuta el codigo de abaj
	
	return Usuario;
};
