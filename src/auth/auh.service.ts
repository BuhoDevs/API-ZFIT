import { Request, Response } from "express";
// import { IAdmin } from "../DTO/IAdmin";
// import { Admin } from "../models/Admin";
import { passwordHashado } from "./helper/bcrypt";
// import { validateRegister } from "../validations/register";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body

  try
  {
    // const validations = validateRegister(usuario);


    const encriptado = await passwordHashado(password);



    const newUser = await prisma.person.create({

      data: {
        firstname,
        lastname,
        User: {
          create: {
            email,
            password: encriptado
          }
        }
      }, include: {
        User: true, // Incluye la información del usuario creado
      },
    }
    );

    if (newUser)
    {
      res.status(400).json({ message: "Usuario Creeado con exito", newUser });
    }

  } catch (error)
  {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  };

};
