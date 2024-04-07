import { Request, Response } from "express";
import { clientRegister } from "./client.service";
import { prisma } from "../db";


export const Client = async (req: Request, res: Response) => {
  const { firstname, lastname, birthdate, ci, phone, photo, genreId, weight, height, email, password } = req.body;
  try {
    const existingClient = await prisma.person.findUnique({where: { ci }     
    });
    if(existingClient)
      return res.status(409).json({ message: "Ya existe un Cliente con ese numero de documento"});

    const newclient = await clientRegister(firstname, lastname, birthdate, ci, phone, photo, genreId, weight,height, email, password);
    
    return res.status(newclient.statuscode).json({message: newclient.message})

  } catch (error) {
    console.error("Error al crear Cliente:", error);
    return res.status(500).json({ error: "Error al registrar Cliente" });
  }
};
