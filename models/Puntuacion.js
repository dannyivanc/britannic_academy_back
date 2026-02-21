const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Puntuacion = sequelize.define('Puntuacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    juego_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_juego: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    puntaje: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'puntuaciones',
    timestamps: false
});

module.exports = Puntuacion;
