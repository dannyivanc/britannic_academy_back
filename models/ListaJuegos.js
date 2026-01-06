const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ListaJuegos = sequelize.define('ListaJuegos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semana_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen_portada: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.ENUM('emparejar', 'seleccion'),
        allowNull: false,
        defaultValue: 'emparejar'
    }
}, {
    tableName: 'lista_juegos',
    timestamps: false
});

module.exports = ListaJuegos;
