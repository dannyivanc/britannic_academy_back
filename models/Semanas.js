const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Semanas = sequelize.define('Semanas', {
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
    },
}, {
    tableName: 'semanas',
    timestamps: false
});


module.exports = Semanas;
