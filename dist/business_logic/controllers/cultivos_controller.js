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
exports.restaurarCultivo = exports.cancelarEditarCultivo = exports.eliminarCultivo = exports.editarCultivo = exports.agregarCultivo = exports.buscarCultivo = exports.listarCultivos = exports.listaCultivoApi = void 0;
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const listaCultivoApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // tslint:disable-next-line:no-console
    const datos = yield (0, cultivos_dta_1.getCultivos)();
    res.status(200).json({
        datos
    });
});
exports.listaCultivoApi = listaCultivoApi;
const listarCultivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivos = yield (0, cultivos_dta_1.getCultivos)();
    res.render('crops', { cultivos });
});
exports.listarCultivos = listarCultivos;
const buscarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        res.render('crops_edit', { cultivo });
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.buscarCultivo = buscarCultivo;
const agregarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, cultivos_dta_1.searchCultivo)(body.nombre)) {
        res.status(404).json({ message: 'El cultivo que intenta agregar ya existe' });
    }
    else {
        yield (0, cultivos_dta_1.postCultivo)(req);
        res.redirect('/cultivos');
    }
});
exports.agregarCultivo = agregarCultivo;
const editarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        if (yield (0, cultivos_dta_1.searchCultivo)(body.nombre)) {
            if (body.nombre == cultivo.dataValues.nombre) {
                yield (0, cultivos_dta_1.putCultivo)(req);
                res.redirect('/cultivos');
            }
            else {
                res.status(404).json({ message: 'El cultivo ya está registrado' });
            }
        }
        else {
            yield (0, cultivos_dta_1.putCultivo)(req);
            res.redirect('/cultivos');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.editarCultivo = editarCultivo;
const eliminarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        yield (0, cultivos_dta_1.deleteCultivo)(id);
        res.redirect('/cultivos');
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.eliminarCultivo = eliminarCultivo;
const cancelarEditarCultivo = (req, res) => {
    res.redirect('/cultivos');
};
exports.cancelarEditarCultivo = cancelarEditarCultivo;
const restaurarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        yield (0, cultivos_dta_1.restoreCultivo)(id);
        res.redirect('/cultivos');
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.restaurarCultivo = restaurarCultivo;
//# sourceMappingURL=cultivos_controller.js.map