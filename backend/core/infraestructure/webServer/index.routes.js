const { Router } = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const compression = require("compression");
const morgan = require("morgan");
module.exports = function ({
	UsuarioRoutes,
	LoginRoutes,
	ValidarToken,
	RolRoutes
	
	//? integrar aqui las clases de rutas declardas en container
}) {
  const router = Router();
  router.use(morgan("combined"));
  const apiRoute = Router();
  const whitelist = ["https://localhost:4200", "https://www.imlchile.cl"];
  apiRoute.use(bodyParser.json()).use(compression()).use(cors(whitelist));
  // ? declara las rutas de las clases
  // TODO se debe automatizar este procedimiento.
  apiRoute.use("/access", LoginRoutes);
  apiRoute.use("/usuario", UsuarioRoutes);
  apiRoute.use("/rol", RolRoutes);

  /* apiRoute.use("/empresa", EmpresaRoutes);
	apiRoute.use("/sucursal", SucursalRoutes);
	apiRoute.use("/auth", AuthRoutes);
	apiRoute.use("/egresoHostal", EgresoHostalRoutes);
	apiRoute.use("/ingresoHostal", IngresoHostalRoutes);
	apiRoute.use("/egresoLubricentro", EgresoLubricentroRoutes);
	apiRoute.use("/ingresoLubricentro", IngresoLubricentroRoutes);
	apiRoute.use("/cliente", ClienteRoutes);
	apiRoute.use("/causa", CausaRoutes);
	apiRoute.use("/contratoCienteAbogado", ContratoClienteAbogadoRoutes);
	apiRoute.use("/cuotasContrato", CuotasContratoAbogadoRoutes);
	apiRoute.use("/abogado", AbogadoRoutes);
	apiRoute.use("/ingresoRentacar", IngresoRentacarRoutes);
	apiRoute.use("/egresoRentacar", EgresoRentacarRoutes);
	apiRoute.use("/banco", BancoRoutes);
	apiRoute.use("/egresoFirma", EgresoFirmaRoutes);
	apiRoute.use("/proyectoAgrofirma", ProyectoAgrofirmaRoutes);
	apiRoute.use("/ingresoAgrofirma", IngresoAgrofirmaRoutes);
	apiRoute.use("/egresoAgrofirma", EgresoAgrofirmaRoutes);
	apiRoute.use("/ingresoInmobiliaria", IngresoInmobiliariaRoutes);
	apiRoute.use("/egresoInmobiliaria", EgresoInmobiliariaRoutes); */

  router.use("/api", apiRoute);

  return router;
};
