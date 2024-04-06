import { Request, Response } from "express";
import { userLogin } from "../auth/auh.service";

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
