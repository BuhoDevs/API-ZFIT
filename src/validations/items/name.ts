import { fullName, nameClass, } from "../../helper/regex";

export const validationFullName = (name: string): string => {
  
  if (!name.match(fullName)) {
    throw new Error("Debes colocar un nombre y apellido valido")
  }

  return name;
}

export const validationClassName = (clasName: string): string => {

  if (!clasName.match(nameClass)) {
    throw new Error("El nombre de la clase debe ser, por ejemplo: cross-fit o danzas modernas")
  }
  
  return clasName;

}