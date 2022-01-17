const container = require("./core/infraestructure/webServer/container");

const db  = container.resolve("db");
const application = container.resolve("app");

application
	.start()
	.then(async () => {
		await db.sequelize.sync({ force: false }).then((result) => {
			console.log("Base de datos sincronizada:");
			console.log(result.models);
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});
	