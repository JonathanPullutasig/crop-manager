import { Request, Response } from "express";
import { deleteCultivo, getCultivo, getCultivos, postCultivo, putCultivo, restoreCultivo, searchCultivo } from "../../data_access/cultivos_dta";

export const listarCultivos = async (req: Request, res: Response) => {
    const cultivos = await getCultivos();
    res.render('crops', { cultivos });
}

export const buscarCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        res.render('crops_edit', { cultivo });
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}

export const agregarCultivo = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchCultivo(body.nombre)) {
        res.status(404).json({ message: 'El cultivo que intenta agregar ya existe' });
    }
    else {
        await postCultivo(req);
        res.redirect('/cultivos');
    }
}

export const editarCultivo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        if (await searchCultivo(body.nombre)) {
            if (body.nombre == cultivo.dataValues.nombre){
                await putCultivo(req);
                res.redirect('/cultivos');
            } else {
                res.status(404).json({ message: 'El cultivo ya está registrado' });
            }
        } else {
            await putCultivo(req);
            res.redirect('/cultivos');
        }
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}

export const eliminarCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        await deleteCultivo(id);
        res.redirect('/cultivos');
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}

export const cancelarEditarCultivo = (req: Request, res: Response) => {
    res.redirect('/cultivos');
};

export const restaurarCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        await restoreCultivo(id);
        res.redirect('/cultivos');
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}