import { Request, Response } from "express";
import {
  insertClient,
  updateClientService,
  getClientByIdService,
  allClientService,
  deleteClientByIdService,
} from "./client.service";
import { prisma } from "../db";
import { passwordHashado } from "../auth/helper/bcrypt";
import { getOffSet } from "../utilities/pagination";

const apiUrl = process.env.API_BASE_URL;

export const clientRegister = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    birthdate,
    ci,
    phone,
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

    const photo = req.file ? `${apiUrl}/${req.file.filename}` : "";
    let passEncriptado = "";
    if (password) passEncriptado = await passwordHashado(password);

    const newclient = await insertClient(
      firstname,
      lastname,
      birthdate,
      ci,
      phone,
      photo,
      Number(genreId),
      weight,
      height,
      email,
      passEncriptado
    );

    return res
      .status(newclient.statuscode)
      .json({ message: newclient.message });
  } catch (error) {
    console.log("el error es ", error);
    return res.status(500).json({ error: "Error al registrar Cliente" });
  }
};

export const updatedClient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {
    genreId,
    firstname,
    lastname,
    birthdate,
    ci,
    phone,
    // personId,
    weight,
    height,
    email,
    password,
  } = req.body;

  try {
    const existingClient = await prisma.client.findUnique({
      where: { id },
      include: { Person: true },
    });

    if (!existingClient) {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    const photo = req.file
      ? `${apiUrl}/${req.file.filename}`
      : existingClient.Person?.photo;
    let passEncriptado = "";
    if (password) passEncriptado = await passwordHashado(password);

    const updatedClient = await updateClientService(id, {
      genreId: Number(genreId),
      firstname,
      lastname,
      birthdate: birthdate ? new Date(birthdate) : undefined,
      ci,
      phone,
      photo,
      // personId: Number(personId),
      weight,
      height,
      email,
      password: passEncriptado,
    });

    return res.json({
      message: "Cliente actualizado correctamente",
      updatedClient,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

export const clientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await getClientByIdService(+id);

    return res.json(client);
  } catch (error) {
    return res.status(500).json({ error: "Error cliente no encontrado" });
  }
};

export const allClient = async (req: Request, res: Response) => {
  const { ci, firstname, lastname, skip, take, banClieSubs } = req.body;

  try {
    const offSetBySkip = getOffSet({ skip, take });
    const client = await allClientService({
      ci,
      firstname,
      lastname,
      take,
      skip: offSetBySkip,
      banClieSubs,
    });
    return res.json(client);
  } catch (error) {
    return res.status(500).json({ error: "Error clientes no encontrados" });
  }
};

export const deleteClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedClient = await deleteClientByIdService(+id);

    return res.json(deletedClient);
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};
