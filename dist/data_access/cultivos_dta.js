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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCultivo = exports.restoreCultivo = exports.deleteCultivo = exports.putCultivo = exports.postCultivo = exports.getCultivo = exports.getCultivos = void 0;
const cultivo_1 = __importDefault(require("../models/cultivo"));
const getCultivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const cultivos = yield cultivo_1.default.findAll();
    return cultivos;
});
exports.getCultivos = getCultivos;
const getCultivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo = yield cultivo_1.default.findByPk(id);
    if (cultivo) {
        return cultivo;
    }
    else {
        return null;
    }
});
exports.getCultivo = getCultivo;
const postCultivo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const cultivo = yield cultivo_1.default.create({
        nombre: body.nombre,
        descripcion: body.descripcion,
        stock: body.stock,
    });
    yield cultivo.save();
});
exports.postCultivo = postCultivo;
const putCultivo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const cultivo = yield cultivo_1.default.findByPk(id);
    if (cultivo) {
        yield cultivo.update(body);
    }
});
exports.putCultivo = putCultivo;
const deleteCultivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo = yield cultivo_1.default.findByPk(id);
    if (cultivo) {
        yield cultivo.update({ activo: false });
    }
});
exports.deleteCultivo = deleteCultivo;
const restoreCultivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo = yield cultivo_1.default.findByPk(id);
    if (cultivo) {
        yield cultivo.update({ activo: true });
    }
});
exports.restoreCultivo = restoreCultivo;
const searchCultivo = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo = yield cultivo_1.default.findOne({
        where: { nombre: nombre },
    });
    if (cultivo) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchCultivo = searchCultivo;
//# sourceMappingURL=cultivos_dta.js.map