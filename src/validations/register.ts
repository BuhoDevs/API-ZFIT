import { IAdmin } from "../DTO/IAdmin";
import { validationEmail } from "./items/gmail";
import { validationPassword } from "./items/password";
import { validationFullName } from "./items/name";

export const validateRegister = (admin: IAdmin): IAdmin => {

  if (!admin.user && !admin.password && !admin.email) {
    throw new Error("Todos los campos son requeridos")
  }

  validationFullName(admin.user);

  validationEmail(admin.email);

  validationPassword(admin.password);

  if (validationPassword(admin.password) !== admin.confirmPassword) {
    throw new Error("El password no coincide")
  }

  return admin;
}