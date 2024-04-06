import { Request, Response } from "express";

import { userRegister } from "../user/user.service";

export const Register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const newUser = await userRegister(firstname, lastname, email, password);
    res
      .status(200)
      .json({ message: "Usuario creado con éxito", user: newUser });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};
