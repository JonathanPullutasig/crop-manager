import { Request, Response } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario, restoreUsuario, searchByEmail, searchByName } from "../../data_access/usuarios_dta";
import { validarEmail, validarPassword } from "../validations/validations";
import { getNombre } from "../../data_access/roles_dta";

export const listarUsuarios = async (req: Request, res: Response) => {
    let usuarios = await getUsuarios();
    let rol;
    for (let i = 0; i < usuarios.length; i++){
        rol = await getNombre(usuarios[i].dataValues.rol_usuario);
        usuarios[i].dataValues.rol = rol;
    }
    res.render('users', { usuarios });
}

export const buscarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const agregarUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchByName(body.nombre_usuario)) {
        res.status(404).json({ message: 'El nombre de usuario ya está en uso' });
    } else {
        if (validarEmail(body.correo)){
            if (await searchByEmail(body.correo)){
                res.status(404).json({ message: 'El correo ya está en uso' });
            } else {
                if (validarPassword(body.contrasena)){
                    await postUsuario(req);
                    res.status(200).json({ message: 'Usuario agregado correctamente' });
                } else {
                    res.status(404).json({ message: 'La contraseña debe tener mínimo 8 caracteres, al menos un número, un raracter especial y una letra Mayúscula' });
                }
            }
        } else {
            res.status(404).json({ message: 'El correo no es válido' });
        }
    }
}

export const editarUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        if (await searchByName(body.nombre_usuario)) {
            if (body.nombre_usuario == usuario.dataValues.nombre_usuario){
                if (validarEmail(body.correo)){
                    if (await searchByEmail(body.correo)){
                        res.status(404).json({ message: 'El correo ya está en uso' });
                    } else {
                        if (validarPassword(body.contrasena)){
                            await putUsuario(req);
                            res.status(200).json({ message: 'Usuario actualizado correctamente' });
                        } else {
                            res.status(404).json({ message: 'La contraseña debe tener mínimo 8 caracteres, al menos un número, un raracter especial y una letra Mayúscula' });
                        }
                    }
                } else {
                    res.status(404).json({ message: 'El correo no es válido' });
                }
            } else {
                res.status(404).json({ message: 'El usuario ya está registrado' });
            }
        } else {
            if (validarEmail(body.correo)){
                if (await searchByEmail(body.correo)){
                    res.status(404).json({ message: 'El correo ya está en uso' });
                } else {
                    if (validarPassword(body.contrasena)){
                        await putUsuario(req);
                        res.status(200).json({ message: 'Usuario actualizado correctamente' });
                    } else {
                        res.status(404).json({ message: 'La contraseña debe tener como mínimo 8 caracteres' });
                    }
                }
            } else {
                res.status(404).json({ message: 'El correo no es válido' });
            }
        }
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const eliminarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        await deleteUsuario(id);
        res.redirect('/usuarios');
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const restaurarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        await restoreUsuario(id);
        res.redirect('/usuarios');
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}