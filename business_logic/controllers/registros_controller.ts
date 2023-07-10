import { Request, Response } from "express";
import { deleteRegistro, getRegistro, getRegistros, postRegistro, searchRegistro } from "../../data_access/registros_dta";

export const listarRegistros = async (req: Request, res: Response) => {
    const registros = await getRegistros();
    res.json(registros);
}

export const buscarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistro(id);
    if (registro !== null) {
        res.json(registro);
    } else {
        res.status(404).json({ message: 'No existe el registro' });
    }
}

export const agregarRegistro = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchRegistro(body.campo)) {
        res.status(404).json({ message: 'No se pueden registrar 2 siembras en el mismo campo' });
    }
    else {
        await postRegistro(req);
        res.status(200).json({ message: 'Registro agregado correctamente' });
    }
}

export const eliminarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistro(id);
    if (registro !== null) {
        await deleteRegistro(id);
        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'No existe el registro' });
    }
}