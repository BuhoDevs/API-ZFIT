import { Response, NextFunction } from "express";
import { verifyToken } from "../auth/helper/jwt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../db";



export const checkJwt = async (req: any, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();

    const isCorrect = (await verifyToken(`${jwt}`)) as JwtPayload;

    if (!isCorrect) {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: isCorrect.id,
      },
    });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "Las credenciales son requeridos" });
  }
};
