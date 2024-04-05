import { hash, compare } from "bcrypt";

export const passwordHashado = async (password: string): Promise<string> => {
  return await hash(password, 12);
};

export const correctPassword = async (
  password: string,
  passwordHashado: string
): Promise<boolean> => {
  return compare(password, passwordHashado);
};
