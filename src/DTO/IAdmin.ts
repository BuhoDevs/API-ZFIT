// export enum TypeRole {
//   Admin = "Admin",
//   Employees = "Empleados",
//   Client = "Client",
// }

export interface IAdmin {
  id?: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  password: string;
  // confirmPassword?: string;
  User?: string;
  Client: string;
}
