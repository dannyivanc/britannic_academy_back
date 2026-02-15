const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Galeria = sequelize.define('Galeria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    proximo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'galeria',
    timestamps: false
});


module.exports = Galeria;
