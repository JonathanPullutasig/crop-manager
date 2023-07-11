"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Coordenada = connect_1.default.define('coordenadas', {
    campo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    latitud: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    longitud: {
        type: sequelize_1.DataTypes.DOUBLE
    },
});
exports.default = Coordenada;
//# sourceMappingURL=coordenada.js.map