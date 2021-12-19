"use strict";
const UsuarioDomainModel = require("../../domain/usuario.domainModel");
//

class CrearUsuario {
  constructor({ UsuarioDomainRepository, UsuarioDomainService }) {
    this._repository = UsuarioDomainRepository;
    this._service = UsuarioDomainService;
  }
  async exe(
    nombre,
    apellido,
    nombreUsuario,
    _hash,
    RolID
    //{ UsuarioDomainRepository, UsuarioDomainService }
  ) {
    const hash = await this._service.encriptarPass(_hash);
    const usuario = new UsuarioDomainModel(
      null,
      nombre,
      apellido,
      nombreUsuario,
      hash,
      RolID
    );
    const usuarioCreated = await this._repository.create(usuario);
    return usuarioCreated;
  } /* default create
	{
    "id": 1,
    "nombre": "hodges",
    "apellido": "troncoso",
    "nombreUsuario": "lordhodges",
    "hash": "$2a$10$R7G2cEUhCh0Hv3GC3XmcLeq3sFoOaNHBa9zfwlDsiZVCrqQLgCvpu",
	 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM5OTM0MjM0LCJleHAiOjE2Mzk5NjMwMzR9.ko_yTQuTTGDh-y_Q3L7Cz8eW_BrL3qS-C_O9bqc5mqY"
	}


	 */
}
module.exports = CrearUsuario;
