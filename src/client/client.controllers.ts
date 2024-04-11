import { Request, Response } from "express";
import { clientRegister, updateClientService, getClientByIdService, allClientService, deleteClientByIdService } from "./client.service";
import { prisma } from "../db";


export const client = async (req: Request, res: Response) => {

  const { firstname, lastname, birthdate, ci, phone, photo, genreId, weight, height, email, password, } = req.body;

  try
  {
    const existingClient = await prisma.person.findUnique({
      where: { ci }
    });
import {
  clientRegister,
  updateClientService,
  getClientByIdService,
  allClientService,
} from "./client.service";
import { prisma } from "../db";

export const Client = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    birthdate,
    ci,
    phone,
    photo,
    genreId,
    weight,
    height,
    email,
    password,
  } = req.body;
  try {
    const existingClient = await prisma.person.findUnique({ where: { ci } });

    if (existingClient)
      return res
        .status(409)
        .json({ message: "Ya existe un Cliente con ese numero de documento" });


  } catch (error)
  {

    const newclient = await clientRegister(
      firstname,
      lastname,
      birthdate,
      ci,
      phone,
      photo,
      genreId,
      weight,
      height,
      email,
      password
    );

    return res
      .status(newclient.statuscode)
      .json({ message: newclient.message });
  } catch (error) {

    return res.status(500).json({ error: "Error al registrar Cliente" });
  }
};

export const updatedClient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, birthdate, ci, phone, photo, genreId } =
    req.body;

  try
  {
    const existingClient = await prisma.person.findUnique({
      where: { id },
    });

    if (!existingClient)
    {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    const updatedClient = await updateClientService(id, {
      firstname,
      lastname,
      birthdate: birthdate ? new Date(birthdate) : undefined,
      ci,
      phone,
      photo,
      genreId,
    });


    return res.json({ message: "Cliente actualizado correctamente", updatedClient });
  } catch (error)
  {

    return res.json({
      message: "Cliente actualizado correctamente",
      updatedClient,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

export const clientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try
  {
    const client = await getClientByIdService(+id);
    return res.json({ message: "Cliente encontrado correctamente", client });


  } catch (error)
  {

  } catch (error) {

    return res.status(500).json({ error: "Error cliente no encontrado" });
  }
};

export const allClient = async (_req: Request, res: Response) => {


  try
  {
    const client = await allClientService();
    return res.json({ message: "Clientes encontrados correctamente", client });

  } catch (error)
  {
    return res.status(500).json({ error: "Error clientes no encontrados" });
  }
};

export const deleteClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try
  {
    const deletedClient = await deleteClientByIdService(+id);

    return res.json({ message: "Cliente eliminado correctamente", client: deletedClient });

  } catch (error)
  {
    return res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

  try {
    const client = await allClientService();
    return res.json({ message: "Clientes encontrados correctamente", client });
  } catch (error) {
    return res.status(500).json({ error: "Error clientes no encontrados" });
  }
};
