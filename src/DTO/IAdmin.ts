export enum TypeRole {
  Admin = "Admin",
  Employees = "Empleados",
  Client = "Client",
}

export interface IAdmin {
  id?: string;
  user: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: TypeRole
}
