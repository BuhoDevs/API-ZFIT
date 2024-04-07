
import { Decimal } from "@prisma/client/runtime/library";
import { passwordHashado } from "../auth/helper/bcrypt";
import { prisma } from "../db";
import { getIsoDate } from "../utils";

export const clientRegister = async (
  firstname: string,
  lastname: string,
  birthdate: string|undefined,
  ci: string,
  phone: number|undefined,
  photo: string|undefined,
  genreId: number,
  weight: Decimal|undefined, 
  height: Decimal|undefined,
  email: string|undefined,
  password: string|undefined,
) => {
  
    let encriptado = "";
    let isoBirthdate: string|undefined;
    if(password)
      encriptado = await passwordHashado(password);   
    if(birthdate){
        isoBirthdate = getIsoDate(birthdate)
      }    
    const newClient = await prisma.person.create({
      data: {
        firstname,
        lastname,
        ...(isoBirthdate&&{birthdate:isoBirthdate}),
        ci,
        phone,
        photo,
        genreId,
        Client: {
          create: {                                  
            weight,
            height,
            status: true,
            email,
            password: encriptado,
          },
        },
      },
      include: {
        Client: true,
      },
    });

    if(!newClient)
      return { message: "Error en el registro de Cliente", statuscode: 409 };
    
      return { message: "Registro de Cliente con éxito", statuscode: 200 };
};
