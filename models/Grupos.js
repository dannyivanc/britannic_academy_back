const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { generateUniqueId } = require('../utils/idGenerator');

const Grupo = sequelize.define('Grupo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dias: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nivel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    identificador: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    docente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'completado'),
        allowNull: false,
        defaultValue: 'activo'
    }
}, {
    tableName: 'grupos',
    timestamps: false,
    hooks: {
        beforeValidate: (grupo) => {
            if (!grupo.identificador) {
                grupo.identificador = generateUniqueId(10);
            }
        }
    }
});

module.exports = Grupo;
