const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const PermisoMaterial = sequelize.define('PermisoMaterial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    tipo_recurso: {
        type: DataTypes.ENUM('juego', 'documento', 'ebook', 'video', 'unidad'),
        allowNull: false
    },
    recurso_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'permiso_materiales',
    timestamps: false
});

module.exports = PermisoMaterial;
