import { JwtPayload, sign, verify } from "jsonwebtoken";

export const generateToken = (id: string) => {
  const jwt = sign({ id }, process.env.TOKEN_CLAVE || "password", {
    expiresIn: "3h",
  });
  return jwt;
};

export const verifyToken = async (jwt: string): Promise< JwtPayload | string> => {
  return verify(jwt, process.env.TOKEN_CLAVE || "password");
};
