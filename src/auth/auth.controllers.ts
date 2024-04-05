import { Request, Response } from "express";
import { userLogin, userRegister } from "../auth/auh.service";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const loginResult = await userLogin(email, password);

    if (loginResult.error) {
      return res
        .status(loginResult.code)
        .json({ message: loginResult.message });
    }
    return res.json(loginResult);
  } catch (error) {
    return res.status(401).json({ message: "Error al loguearse" });
  }
};

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
