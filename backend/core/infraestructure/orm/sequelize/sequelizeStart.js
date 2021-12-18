// esto deberia estar en la capa de infraestructura
// de los recursos de configuracion de la aplicacion

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const { DB } = require("../../config/env");
const config = DB;
const db = {};
var dir = require("node-dir");
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);
//bkjbas
dir.subdirs("./core/src/contexts/", function (err, subdirs) {
	if (err) throw err;

	//we have an array of subdirs now, so now we'll iterate that array
	subdirs.forEach(function (filepath) {
		fs.readdirSync(filepath)
			.filter((file) => {
				return (
					file.indexOf(".") !== 0 &&
					file !== basename &&
					file.slice(-12) === ".dalModel.js"
				);
			})
			.forEach((file) => {
				
				/* const model = sequelize.import(path.join('../../../../', filepath, file)); */

				var model = require(path.join('../../../../', filepath, file))(sequelize, 
					Sequelize);
				//agregar archivos como modelos sequelize

				db[model.name] = model;
			});
	});
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;