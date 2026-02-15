const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo para el juego de emparejar palabras  
const Contactos = sequelize.define('Contactos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen_url: {
        type: DataTypes.STRING, 
        allowNull: false,
    }
}, {
    tableName: 'contactos',
    timestamps: false
});

module.exports = Contactos;

