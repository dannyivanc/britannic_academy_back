const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Unidades = sequelize.define('Unidades', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nivel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'unidades',
    timestamps: false
});


module.exports = Unidades;
