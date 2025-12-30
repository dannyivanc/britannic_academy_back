const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nivel = sequelize.define('Nivel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orden: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'niveles',
    timestamps: false
});

module.exports = Nivel;
