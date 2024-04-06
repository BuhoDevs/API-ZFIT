import { Router } from "express";
import { Login } from "./auth.controllers";

const authRoutes = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: email del usuario(debe ser controlado desde el front)
 *              password:
 *                  type: string
 *                  description: debe contener al menos 8 cr,1 min,1 may,1num,1 caracter esp.
 *              roleId:
 *                  type: integer
 *                  description: el id del role correspondiente
 *              personId:
 *                  type: integer
 *                  description: el id foraneo de los datos de tabla Persona
 *              person:
 *                  type: object
 *                  additionalProperties:
 *                      $ref: '#/components/schemas/Person'
 *          required:
 *              - email
 *              - password
 *          example:
 *              id: id del usuario
 *              email: 'pepito@palotes.com'
 *              password: Pepito1*
 *              roleId: 5
 *              personId: este dato se generara con el registro de los datos de persona
 *              person:
 *                 id: id de la persona
 *                 firstname: nombre de la persona
 *                 lastname: apellido de la persona
 *                 birthdate: fecha de nacimiento
 *      Person:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: id de la persona
 *              firstname:
 *                  type: string
 *                  description: nombre de la persona
 *              lastname:
 *                  type: string
 *                  description: apellido de la persona
 *              birthdate:
 *                  type: string
 *                  description: fecha de nacimiento
 *          required:
 *              - firstname
 *              - lastname
 *          example:
 *              id: id de la persona
 *              firstname: nombre de la persona
 *              lastname: apellido de la persona
 *              birthdate: fecha de nacimiento
 */

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: endpoints de autentiación
 */

/**
 * @swagger
 * /auth:
 *  post:
 *      summary: Registra un nuevo Usuario
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: El Usuario fue registrado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Error interno del servidor
 */

authRoutes.post("/login", Login);

export default authRoutes;
