import { Request, Response } from "express";
import { getUsuarioByName } from "../../data_access/usuarios_dta";

export const iniciarSesion = async (req: Request, res: Response) => {
    const { body } = req;
    const usuario = await getUsuarioByName(body.nombre_usuario);
    if (usuario !== null) {
        if (body.contrasena == usuario.dataValues.contrasena) {
            //Agregar codigo luego de inicio de sesion
            res.status(200).json({ messniage: 'Sesión iniciada correctamente' });
        } else {
            res.status(404).json({ message: 'La contraseña es incorrecta' });
        }
    } else {
        res.status(404).json({ message: 'El usuario no está registrado' });
    }
}