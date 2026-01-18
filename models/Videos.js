const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Videos = sequelize.define('Videos', {
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
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'videos',
    timestamps: false
});

module.exports = Videos;
