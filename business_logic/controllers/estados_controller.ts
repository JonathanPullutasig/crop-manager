import { Request, Response } from "express";
import { deleteEstado, getEstado, getEstados, postEstado, putEstado, restoreEstado, searchEstado } from "../../data_access/estados_dta";

export const listarEstados = async (req: Request, res: Response) => {
    const estados = await getEstados();
    res.render('states', { estados });
}

export const buscarEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        res.render('states_edit', { estado });
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const agregarEstado = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchEstado(body.nombre)) {
        res.status(404).json({ message: 'El estado que intenta agregar ya existe' });
    }
    else {
        await postEstado(req);
        res.redirect('/estados');
    }
}

export const editarEstado = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        if (await searchEstado(body.nombre)) {
            if (body.nombre == estado.dataValues.nombre){
                await putEstado(req);
                res.redirect('/estados');
            } else {
                res.status(404).json({ message: 'El estado ya está registrado' });
            }
        } else {
            await putEstado(req);
            res.redirect('/estados');
        }
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const eliminarEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        await deleteEstado(id);
        res.redirect('/estados');
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const restaurarEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        await restoreEstado(id);
        res.redirect('/estados');
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const cancelarEditarEstado = (req: Request, res: Response) => {
    res.redirect('/estados');
};