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
exports.restaurarUsuario = exports.eliminarUsuario = exports.editarUsuario = exports.agregarUsuario = exports.buscarUsuario = exports.listarUsuarios = void 0;
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const validations_1 = require("../validations/validations");
const roles_dta_1 = require("../../data_access/roles_dta");
const listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let usuarios = yield (0, usuarios_dta_1.getUsuarios)();
    let rol;
    for (let i = 0; i < usuarios.length; i++) {
        rol = yield (0, roles_dta_1.getNombre)(usuarios[i].dataValues.rol_usuario);
        usuarios[i].dataValues.rol = rol;
    }
    res.render('users', { usuarios });
});
exports.listarUsuarios = listarUsuarios;
const buscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        res.json(usuario);
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.buscarUsuario = buscarUsuario;
const agregarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, usuarios_dta_1.searchByName)(body.nombre_usuario)) {
        res.status(404).json({ message: 'El nombre de usuario ya está en uso' });
    }
    else {
        if ((0, validations_1.validarEmail)(body.correo)) {
            if (yield (0, usuarios_dta_1.searchByEmail)(body.correo)) {
                res.status(404).json({ message: 'El correo ya está en uso' });
            }
            else {
                if ((0, validations_1.validarPassword)(body.contrasena)) {
                    yield (0, usuarios_dta_1.postUsuario)(req);
                    res.status(200).json({ message: 'Usuario agregado correctamente' });
                }
                else {
                    res.status(404).json({ message: 'La contraseña debe tener mínimo 8 caracteres, al menos un número, un raracter especial y una letra Mayúscula' });
                }
            }
        }
        else {
            res.status(404).json({ message: 'El correo no es válido' });
        }
    }
});
exports.agregarUsuario = agregarUsuario;
const editarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        if (yield (0, usuarios_dta_1.searchByName)(body.nombre_usuario)) {
            if (body.nombre_usuario == usuario.dataValues.nombre_usuario) {
                if ((0, validations_1.validarEmail)(body.correo)) {
                    if (yield (0, usuarios_dta_1.searchByEmail)(body.correo)) {
                        res.status(404).json({ message: 'El correo ya está en uso' });
                    }
                    else {
                        if ((0, validations_1.validarPassword)(body.contrasena)) {
                            yield (0, usuarios_dta_1.putUsuario)(req);
                            res.status(200).json({ message: 'Usuario actualizado correctamente' });
                        }
                        else {
                            res.status(404).json({ message: 'La contraseña debe tener mínimo 8 caracteres, al menos un número, un raracter especial y una letra Mayúscula' });
                        }
                    }
                }
                else {
                    res.status(404).json({ message: 'El correo no es válido' });
                }
            }
            else {
                res.status(404).json({ message: 'El usuario ya está registrado' });
            }
        }
        else {
            if ((0, validations_1.validarEmail)(body.correo)) {
                if (yield (0, usuarios_dta_1.searchByEmail)(body.correo)) {
                    res.status(404).json({ message: 'El correo ya está en uso' });
                }
                else {
                    if ((0, validations_1.validarPassword)(body.contrasena)) {
                        yield (0, usuarios_dta_1.putUsuario)(req);
                        res.status(200).json({ message: 'Usuario actualizado correctamente' });
                    }
                    else {
                        res.status(404).json({ message: 'La contraseña debe tener como mínimo 8 caracteres' });
                    }
                }
            }
            else {
                res.status(404).json({ message: 'El correo no es válido' });
            }
        }
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.editarUsuario = editarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        yield (0, usuarios_dta_1.deleteUsuario)(id);
        res.redirect('/usuarios');
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.eliminarUsuario = eliminarUsuario;
const restaurarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        yield (0, usuarios_dta_1.restoreUsuario)(id);
        res.redirect('/usuarios');
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.restaurarUsuario = restaurarUsuario;
//# sourceMappingURL=usuarios_controller.js.map