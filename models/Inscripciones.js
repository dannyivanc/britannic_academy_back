const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inscripciones = sequelize.define('Inscripciones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    grupo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'completado', 'abandonado'),
        allowNull: false,
        defaultValue: 'activo'
    }
}, {
    tableName: 'inscripciones',
    timestamps: false
});


module.exports = Inscripciones;