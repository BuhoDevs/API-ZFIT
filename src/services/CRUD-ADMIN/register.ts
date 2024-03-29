import { Request, Response } from "express";
import { IAdmin } from "../../DTO/IAdmin";
import { Admin } from "../../models/Admin";
import { passwordHashado } from "../../helper/bcrypt";
import { validateRegister } from "../../validations/register";

export const registerUser = async (req: Request, res: Response) => {
  const usuario = req.body as IAdmin;

  try {
    const validations = validateRegister(usuario);

    const existUser = await Admin.findOne({
      where: { email: usuario.email },
    });

    if (existUser) {
      return res.status(400).json({ error: "El usuario ya existe", existUser });
    }

    const encriptado = await passwordHashado(validations.password);

    const newUser = await Admin.create({
      user: validations.user,
      email: validations.email,
      password: encriptado,
    });

    if (newUser) {
      return res.status(200).json({ message: "Usuario creado", newUser });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.log(error);
  }
}

