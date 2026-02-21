const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { generateUniqueId } = require('../utils/idGenerator');

const Semanas = sequelize.define('Semanas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    identificador: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'semanas',
    timestamps: false,
    hooks: {
        beforeValidate: (semana) => {
            if (!semana.identificador) {
                semana.identificador = generateUniqueId(10);
            }
        }
    }
});

module.exports = Semanas;
