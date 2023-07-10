"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarTrazado = exports.eliminarCampo = exports.editarCampo = exports.agregarCampo = exports.buscarCampo = exports.listarCampos = void 0;
const campos_dta_1 = require("../../data_access/campos_dta");
const parameters_1 = require("../validations/parameters");
const listarCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield (0, campos_dta_1.getCampos)();
    res.json(campos);
});
exports.listarCampos = listarCampos;
const buscarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        res.json(campo);
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.buscarCampo = buscarCampo;
const agregarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (body.area >= (0, parameters_1.getArea)()) {
        yield (0, campos_dta_1.postCampo)(req);
        res.status(200).json({ message: 'Campo agregado correctamente' });
    }
    else {
        res.status(404).json({ message: 'El área del campo no cumple con los requisitos' });
    }
});
exports.agregarCampo = agregarCampo;
const editarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        if (body.area >= (0, parameters_1.getArea)()) {
            yield (0, campos_dta_1.putCampo)(req);
            res.status(200).json({ message: 'Campo actualizado correctamente' });
        }
        else {
            res.status(404).json({ message: 'El área del campo no cumple con los requisitos' });
        }
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.editarCampo = editarCampo;
const eliminarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        yield (0, campos_dta_1.deleteCampo)(id);
        res.status(200).json({ message: 'Campo eliminado correctamente' });
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.eliminarCampo = eliminarCampo;
const mostrarTrazado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('trazado');
});
exports.mostrarTrazado = mostrarTrazado;
//# sourceMappingURL=campos_controller.js.map