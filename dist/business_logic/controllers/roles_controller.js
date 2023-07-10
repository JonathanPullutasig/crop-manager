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
exports.cancelarEditarRol = exports.restaurarRol = exports.eliminarRol = exports.editarRol = exports.agregarRol = exports.buscarRol = exports.listarRoles = void 0;
const roles_dta_1 = require("../../data_access/roles_dta");
const listarRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, roles_dta_1.getRoles)();
    res.render('roles', { roles });
});
exports.listarRoles = listarRoles;
const buscarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        res.render('roles_edit', { rol });
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.buscarRol = buscarRol;
const agregarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, roles_dta_1.searchRol)(body.nombre)) {
        res.status(404).json({ message: 'El rol que intenta agregar ya existe' });
    }
    else {
        yield (0, roles_dta_1.postRol)(req);
        res.redirect('/roles');
    }
});
exports.agregarRol = agregarRol;
const editarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        if (yield (0, roles_dta_1.searchRol)(body.nombre)) {
            if (body.nombre == rol.dataValues.nombre) {
                yield (0, roles_dta_1.putRol)(req);
                res.redirect('/roles');
            }
            else {
                res.status(404).json({ message: 'El rol ya está registrado' });
            }
        }
        else {
            yield (0, roles_dta_1.putRol)(req);
            res.redirect('/roles');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.editarRol = editarRol;
const eliminarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        yield (0, roles_dta_1.deleteRol)(id);
        res.redirect('/roles');
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.eliminarRol = eliminarRol;
const restaurarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        yield (0, roles_dta_1.restoreRol)(id);
        res.redirect('/roles');
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.restaurarRol = restaurarRol;
const cancelarEditarRol = (req, res) => {
    res.redirect('/roles');
};
exports.cancelarEditarRol = cancelarEditarRol;
//# sourceMappingURL=roles_controller.js.map