const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anuncios = sequelize.define('Anuncios', {
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
}, {
    tableName: 'anuncios',
    timestamps: false
});


module.exports = Anuncios;
