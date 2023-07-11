import { DataTypes } from "sequelize";
import db from "../database/connect";

const Campo = db.define('campos',{
    encargado:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.INTEGER
    },
    descripcion:{
        type:DataTypes.STRING
    },
    area:{
        type:DataTypes.DECIMAL
    },
    activo:{
        type:DataTypes.BOOLEAN
    },
    coordenadas:{
        type:DataTypes.TEXT
    }
});

export default Campo;