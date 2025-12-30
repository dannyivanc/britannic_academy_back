const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    try {
        const { rol } = req.query;
        const where = {};
        if (rol) {
            where.rol = rol;
        }

        const users = await Usuario.findAll({
            where,
            attributes: { exclude: ['password'] } // no envia contraseña
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        // console.log('Creando usuario. Body:', req.body);
        const { nombre, usuario, password, rol, celular, email } = req.body;

        const existingUser = await Usuario.findOne({ where: { usuario } });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        if (email) {
            const existingEmail = await Usuario.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Usuario.create({ nombre, usuario, password: hashedPassword, rol, celular, email, activo: true });
        res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
        // console.error('Error en createUser:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, celular, email, usuario, rol, password } = req.body;
        const user = await Usuario.findByPk(id);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (usuario && usuario !== user.usuario) {
            const existingUser = await Usuario.findOne({ where: { usuario } });
            if (existingUser) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }
        }

        if (email && email !== user.email) {
            const existingEmail = await Usuario.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
            }
        }

        user.nombre = nombre || user.nombre;
        user.celular = celular || user.celular;
        user.email = email || user.email;
        user.usuario = usuario || user.usuario;
        user.rol = rol || user.rol;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: 'Usuario actualizado', user });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Error de duplicidad: Ya existe un registro con esos datos.' });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findByPk(id);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        user.activo = !user.activo;
        await user.save();

        res.json({ message: `Usuario ${user.activo ? 'activado' : 'desactivado'}`, active: user.activo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
