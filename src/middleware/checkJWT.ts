
import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../auth/helper/jwt"
// import { Usermodel } from "../models/UsersModel"
import { JwtPayload } from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




export const checkJwt = async (req: any, res: Response, next: NextFunction) => {
    try
    {

        const jwtByUser = req.headers.authorization || ""
        const jwt = jwtByUser.split(" ").pop()

        const isCorrect = verifyToken(`${ jwt }`) as JwtPayload

        if (!isCorrect)
        {

            return res.status(401).json({ msg: "Token invalido" })
        } else
        {


            const user = await prisma.user.findFirst({
                where: {
                    email: isCorrect.id
                }
            })

            req.user = user
            next()
        }

    } catch (error)
    {
        return res.status(400).json({ msg: "Session Invalida" })
    }
}