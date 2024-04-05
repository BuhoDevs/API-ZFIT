import { Request, Response } from "express";
import { userLogin, userRegister } from "../auth/auh.service";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userLogin(email, password);
    return res.json({ message: "Usuario logueado con exito", user });
  } catch (error) {
    return res.status(401).json({ message: "Error al loguearse" });
  }
};

export const Register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const newUser = await userRegister(firstname, lastname, email, password);
    return res.json({ message: "Usuario creado con éxito", newUser });
  } catch (error) {
    return res.status(401).json({ error: "Error al crear el usuario" });
  }
};
