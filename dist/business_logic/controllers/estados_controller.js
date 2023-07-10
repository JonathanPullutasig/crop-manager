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
exports.cancelarEditarEstado = exports.restaurarEstado = exports.eliminarEstado = exports.editarEstado = exports.agregarEstado = exports.buscarEstado = exports.listarEstados = void 0;
const estados_dta_1 = require("../../data_access/estados_dta");
const listarEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estados = yield (0, estados_dta_1.getEstados)();
    res.render('states', { estados });
});
exports.listarEstados = listarEstados;
const buscarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        res.render('states_edit', { estado });
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.buscarEstado = buscarEstado;
const agregarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, estados_dta_1.searchEstado)(body.nombre)) {
        res.status(404).json({ message: 'El estado que intenta agregar ya existe' });
    }
    else {
        yield (0, estados_dta_1.postEstado)(req);
        res.redirect('/estados');
    }
});
exports.agregarEstado = agregarEstado;
const editarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        if (yield (0, estados_dta_1.searchEstado)(body.nombre)) {
            if (body.nombre == estado.dataValues.nombre) {
                yield (0, estados_dta_1.putEstado)(req);
                res.redirect('/estados');
            }
            else {
                res.status(404).json({ message: 'El estado ya está registrado' });
            }
        }
        else {
            yield (0, estados_dta_1.putEstado)(req);
            res.redirect('/estados');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.editarEstado = editarEstado;
const eliminarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        yield (0, estados_dta_1.deleteEstado)(id);
        res.redirect('/estados');
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.eliminarEstado = eliminarEstado;
const restaurarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        yield (0, estados_dta_1.restoreEstado)(id);
        res.redirect('/estados');
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.restaurarEstado = restaurarEstado;
const cancelarEditarEstado = (req, res) => {
    res.redirect('/estados');
};
exports.cancelarEditarEstado = cancelarEditarEstado;
//# sourceMappingURL=estados_controller.js.map