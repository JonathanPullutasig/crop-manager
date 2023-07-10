import { Request, Response } from "express";
import { deleteRol, getRol, getRoles, postRol, putRol, restoreRol, searchRol } from "../../data_access/roles_dta";

export const listarRoles = async (req: Request, res: Response) => {
    const roles = await getRoles();
    res.render('roles', { roles });
}

export const buscarRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        res.render('roles_edit', { rol });
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const agregarRol = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchRol(body.nombre)) {
        res.status(404).json({ message: 'El rol que intenta agregar ya existe' })
    }
    else {
        await postRol(req);
        res.redirect('/roles');
    }
}

export const editarRol = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        if (await searchRol(body.nombre)) {
            if (body.nombre == rol.dataValues.nombre){
                await putRol(req);
                res.redirect('/roles');
            } else {
                res.status(404).json({ message: 'El rol ya está registrado' });
            }
        } else {
            await putRol(req);
            res.redirect('/roles');
        }
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const eliminarRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        await deleteRol(id);
        res.redirect('/roles');
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const restaurarRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        await restoreRol(id);
        res.redirect('/roles');
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const cancelarEditarRol = (req: Request, res: Response) => {
    res.redirect('/roles');
};