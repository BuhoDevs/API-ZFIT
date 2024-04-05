import { Request, Response } from 'express';
import { userLogin } from '../auth/auh.service';

export const Login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try
    {
        const message = await userLogin(email, password);
        return res.json(message);
    } catch (error)
    {
        return res.status(401).json({ message: "Error al loguearse" });
    }
}
