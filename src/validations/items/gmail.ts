import { dominiosPermitidosRegex, emailRegex } from "../../helper/regex";

export const validationEmail = (gmail: string): string => {

  if (!gmail) {
    // return res.status(400).json({ message: 'Debe ingresar un correo' });
    throw new Error('Debe ingresar un correo');
  }

  if (!emailRegex.test(gmail) || !dominiosPermitidosRegex.test(gmail)) {
    // return res.status(400).json({ message: 'El correo electrónico no es válido' });
    throw new Error('El correo electrónico no es válido');
  }

  return gmail;
}