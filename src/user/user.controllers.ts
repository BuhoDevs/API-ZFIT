import { Request, Response } from "express";

import { userRegister } from "../user/user.service";

export const Register = async (req: Request, res: Response) => {
  const { firstname, lastname, birthdate, ci, phone, photo, genreId, email, password } = req.body;

  try
  {
    const newUser = await userRegister(firstname, lastname, birthdate, ci, phone, photo, genreId, email, password);

    return res.status(newUser.statuscode).json({ message: newUser.message })

  } catch (error)
  {
    return res.status(500).json({ error: "Error al registrar Usuario" });
  }
};
