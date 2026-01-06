const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo para el juego de emparejar palabras  
const JuegoEmpList = sequelize.define('JuegoEmpList', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    palabra: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'juego_emparejar_lista',
    timestamps: false
});

module.exports = JuegoEmpList;

