class StartUp {
	constructor({ server, socket }) {
		this._server = server;
		this._socket = socket;
	}

	async start() {
		await this._server.start();
		
	}
}

module.exports = StartUp;
