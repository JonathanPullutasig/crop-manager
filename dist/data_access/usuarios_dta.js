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
exports.getUsuarioByName = exports.searchByEmail = exports.searchByName = exports.restoreUsuario = exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    return usuarios;
});
exports.getUsuarios = getUsuarios;
const getUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        return usuario;
    }
    else {
        return null;
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield usuario_1.default.create({
        rol_usuario: body.rol_usuario,
        nombre_completo: body.nombre_completo,
        correo: body.correo,
        nombre_usuario: body.nombre_usuario,
        contrasena: body.contrasena
    });
    yield usuario.save();
});
exports.postUsuario = postUsuario;
const putUsuario = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update(body);
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update({ activo: false });
    }
});
exports.deleteUsuario = deleteUsuario;
const restoreUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update({ activo: true });
    }
});
exports.restoreUsuario = restoreUsuario;
const searchByName = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: { nombre_usuario: nombre },
    });
    if (usuario) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchByName = searchByName;
const searchByEmail = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: { correo: correo },
    });
    if (usuario) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchByEmail = searchByEmail;
const getUsuarioByName = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: { nombre_usuario: nombre },
    });
    if (usuario) {
        return usuario;
    }
    else {
        return null;
    }
});
exports.getUsuarioByName = getUsuarioByName;
//# sourceMappingURL=usuarios_dta.js.map