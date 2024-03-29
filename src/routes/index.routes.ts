import { Response, Router } from "express";

const indexRoutes = Router();

indexRoutes.use("/auth", (res: Response) => {
  // TODO: migrar este controlador al respectivo archivo de rutas especificas para AUTH
  return res.send("ruta encargada de la autenticacion");
});

indexRoutes.use("/patients", (res: Response) => {
  // TODO: migrar este controlador al respectivo archivo de rutas especificas para PATIENTS
  return res.send("ruta encargada de los recursos de los pacientes");
});

export default indexRoutes;
