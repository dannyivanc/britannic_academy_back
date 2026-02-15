const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Unidades = require('./Unidades');

const Ebooks = sequelize.define('Ebooks', {
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
        unique: true, // Only one Ebook per unit
        references: {
            model: Unidades,
            key: 'id'
        }
    },
    archivo_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    directorio_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_portada: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
}, {
    tableName: 'ebooks',
    timestamps: false
});

module.exports = Ebooks;
