const bcrypt = require("bcryptjs");
class UsuarioDomainService {
	constructor() {}

	async encriptarPass(_hash) {
		const salt = await bcrypt.genSalt(1);
		const hash = await bcrypt.hash(_hash, salt);
		return hash;
	}
}
module.exports = UsuarioDomainService;
