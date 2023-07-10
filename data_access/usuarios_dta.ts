import { Request } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async () => {
    const usuarios = await Usuario.findAll();
    return usuarios;
}

export const getUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return usuario;
    } else {
        return null;
    }
}

export const postUsuario = async (req: Request) => {
    const { body } = req;
    const usuario = await Usuario.create({
        rol_usuario: body.rol_usuario,
        nombre_completo: body.nombre_completo,
        correo: body.correo,
        nombre_usuario: body.nombre_usuario,
        contrasena: body.contrasena
    })
    await usuario.save();
}

export const putUsuario = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario){
        await usuario.update(body);
    }
}

export const deleteUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({ activo: false });
    } 
}

export const restoreUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({ activo: true });
    } 
}

export const searchByName = async (nombre: string) => {
    const usuario = await Usuario.findOne({
        where: { nombre_usuario: nombre },
    });
    if (usuario) {
        return true;
    } else {
        return false;
    }
}

export const searchByEmail = async (correo: string) => {
    const usuario = await Usuario.findOne({
        where: { correo: correo },
    });
    if (usuario) {
        return true;
    } else {
        return false;
    }
}

export const getUsuarioByName = async (nombre: string) => {
    const usuario = await Usuario.findOne({
        where: { nombre_usuario: nombre },
    });
    if (usuario) {
        return usuario;
    } else {
        return null;
    }
}