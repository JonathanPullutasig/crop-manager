import { Request, Response } from "express";
import { deleteCampo, getCampo, getCampos, postCampo, putCampo } from "../../data_access/campos_dta";
import { getArea } from "../validations/parameters";

export const listarCampos = async (req: Request, res: Response) =>
{
    const campos = await getCampos(req.body);
    res.json(campos);
}

export const buscarCampo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const campo = await getCampo(id);
    if (campo !== null) {
        res.json(campo);
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const agregarCampo = async (req: Request, res: Response) => {
    const { body } = req;
    // tslint:disable-next-line:no-console
    console.log(req.body)

    if (body.area >= getArea()){
        await postCampo(req);
        res.status(200).json({ message: 'Campo agregado correctamente' });
    } else {
        res.status(404).json({ message: 'El área del campo no cumple con los requisitos' });
    }
}

export const editarCampo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const campo = await getCampo(id);
    if (campo !== null) {
        if (body.area >= getArea()) {
            await putCampo(req);
            res.status(200).json({ message: 'Campo actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'El área del campo no cumple con los requisitos' });
        }
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const eliminarCampo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const campo = await getCampo(id);
    if (campo !== null) {
        await deleteCampo(id);
        res.status(200).json({ message: 'Campo eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const mostrarTrazado = async (req: Request, res: Response) => {
    res.render('trazado')

}