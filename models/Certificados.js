const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certificados = sequelize.define('Certificados', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    tableName: 'certificados',
    timestamps: false
});


module.exports = Certificados;
