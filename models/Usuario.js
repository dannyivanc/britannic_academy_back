const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'docente', 'estudiante', 'sin_rol'),
        allowNull: false,
        defaultValue: 'sin_rol'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sessionToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    ultimaActividad: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;
