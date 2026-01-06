const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo para el juego de seleccion correcta
const JuegoSelCor = sequelize.define('JuegoSelCor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    palabra_correcta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    palabra_incorrecta1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    palabra_incorrecta2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    palabra_incorrecta3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pregunta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'palabra_seleccion_correcta',
    timestamps: false
});

module.exports = JuegoSelCor;

