import { Request } from "express";
import Campo from "../models/campo";

export const getCampos = async () => {
    const campos = await Campo.findAll();
    return campos;
}

export const getCampo = async (id: string) => {
    const campo = await Campo.findByPk(id);
    if (campo) {
        return campo;
    } else {
        return null;
    }
}

export const postCampo = async (req: Request) => {
    const { body } = req;
    const campo = await Campo.create({
        encargado: body.encargado,
        estado: body.estado,
        descripcion: body.descripcion,
        area: body.area,
    })
    await campo.save();
}

export const putCampo = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const campo = await Campo.findByPk(id);
    if (campo){
        await campo.update(body);
    }
}

export const deleteCampo = async (id: string) => {
    const campo = await Campo.findByPk(id);
    if (campo) {
        await campo.update({ activo: false });
    } 
}