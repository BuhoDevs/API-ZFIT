import { regexPassword } from "../../helper/regex"

export const validationPassword = (password: string): string => {

  if (!regexPassword.test(password)) {
    // return res.status(400).json({
    //   message: 'La contraseña debe contener al menos 8 caracteres incluyendo: mayúsculas, minúsculas, números y caracteres especiales ( @, $, !, %, *, ?, _ , - o &.)'
    // });
    throw new Error('La contraseña debe contener al menos 8 caracteres incluyendo: Mayúsculas, Minúsculas, números y caracteres especiales (@, $, !, %, *, ?, _ , -, &)');// OK
  }

  return password;
}