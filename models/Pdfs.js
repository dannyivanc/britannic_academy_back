const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Unidades = require('./Unidades');

const Pdfs = sequelize.define('Pdfs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Only one PDF per unit
        references: {
            model: Unidades,
            key: 'id'
        }
    },
    archivo_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_portada: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
}, {
    tableName: 'pdfs',
    timestamps: false
});

module.exports = Pdfs;
