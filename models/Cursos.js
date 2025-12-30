const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cursos = sequelize.define('Cursos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lugar: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'cursos',
    timestamps: false
});


module.exports = Cursos;
