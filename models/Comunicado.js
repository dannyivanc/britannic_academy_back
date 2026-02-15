const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comunicado = sequelize.define('Comunicado', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'comunicados',
    timestamps: false
});


module.exports = Comunicado;
