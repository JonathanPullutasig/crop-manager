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
exports.iniciarSesion = void 0;
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield (0, usuarios_dta_1.getUsuarioByName)(body.nombre_usuario);
    if (usuario !== null) {
        if (body.contrasena == usuario.dataValues.contrasena) {
            //Agregar codigo luego de inicio de sesion
            res.status(200).json({ messniage: 'Sesión iniciada correctamente' });
        }
        else {
            res.status(404).json({ message: 'La contraseña es incorrecta' });
        }
    }
    else {
        res.status(404).json({ message: 'El usuario no está registrado' });
    }
});
exports.iniciarSesion = iniciarSesion;
//# sourceMappingURL=login_controller.js.map