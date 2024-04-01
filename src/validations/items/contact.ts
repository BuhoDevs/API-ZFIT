import { regexPhone } from "../../auth/services/helper/regex";

export const validationContact = (contact: string): string => {

  if (!contact)
  {
    throw new Error('Debe ingresar un contacto');
  }

  if (!regexPhone.test(contact))
  {
    throw new Error('Numero de contacto es inválido');
  }

  return contact;
}