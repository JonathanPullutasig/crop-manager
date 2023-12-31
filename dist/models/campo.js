"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Campo = connect_1.default.define('campos', {
    encargado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    area: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    coordenadas: {
        type: sequelize_1.DataTypes.TEXT
    }
});
exports.default = Campo;
//# sourceMappingURL=campo.js.map