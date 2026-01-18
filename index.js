const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const nivelRoutes = require('./routes/nivelRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');
const unidadesRoutes = require('./routes/unidadesRoutes');
const gameRoutes = require('./routes/gameRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: (origin, callback) => {
        // Permitir todos los orígenes en desarrollo, pero devolviendo el origen exacto para CORS con credentials
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true,
    optionsSuccessStatus: 200 // Importante para algunos navegadores con preflight
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => {
    console.log('Health check requested');
    res.json({ message: 'Backend is reachable via tunnel' });
});

const Curso = require('./models/Cursos');
const Nivel = require('./models/Niveles');
const Grupo = require('./models/Grupos');
const Usuario = require('./models/Usuario');
const Inscripcion = require('./models/Inscripciones');
const Unidades = require('./models/Unidades');
const Semanas = require('./models/Semanas');
const ListaJuegos = require('./models/ListaJuegos');
const JuegoEmpList = require('./models/JuegoEmpList');
const Pdfs = require('./models/Pdfs');
const Videos = require('./models/Videos');

// Asociaciones
Curso.hasMany(Nivel, { foreignKey: 'curso_id', as: 'niveles' });
Nivel.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });
Nivel.hasMany(Grupo, { foreignKey: 'nivel_id', as: 'grupos' });
Grupo.belongsTo(Nivel, { foreignKey: 'nivel_id', as: 'nivel' });
Usuario.hasMany(Grupo, { foreignKey: 'docente_id', as: 'grupos_docente' });
Grupo.belongsTo(Usuario, { foreignKey: 'docente_id', as: 'docente' });

// Inscripciones asociaciones
Inscripcion.belongsTo(Grupo, { foreignKey: 'grupo_id', as: 'grupo' });
Grupo.hasMany(Inscripcion, { foreignKey: 'grupo_id', as: 'inscripciones' });
Inscripcion.belongsTo(Usuario, { foreignKey: 'estudiante_id', as: 'estudiante' });
Usuario.hasMany(Inscripcion, { foreignKey: 'estudiante_id', as: 'inscripciones' });

// Unidades y Semanas
Nivel.hasMany(Unidades, { foreignKey: 'nivel_id', as: 'unidades' });
Unidades.belongsTo(Nivel, { foreignKey: 'nivel_id', as: 'nivel' });
Unidades.hasMany(Semanas, { foreignKey: 'unidad_id', as: 'semanas' });
Semanas.belongsTo(Unidades, { foreignKey: 'unidad_id', as: 'unidad' });

// Juego de enlazar palabras
Semanas.hasMany(ListaJuegos, { foreignKey: 'semana_id', as: 'listas_palabras' });
ListaJuegos.belongsTo(Semanas, { foreignKey: 'semana_id', as: 'semana' });
ListaJuegos.hasMany(JuegoEmpList, { foreignKey: 'lista_id', as: 'palabras' });
JuegoEmpList.belongsTo(ListaJuegos, { foreignKey: 'lista_id', as: 'lista' });

// PDFs
Unidades.hasOne(Pdfs, { foreignKey: 'unidad_id', as: 'pdf' });
Pdfs.belongsTo(Unidades, { foreignKey: 'unidad_id', as: 'unidad' });

// Videos
Semanas.hasMany(Videos, { foreignKey: 'semana_id', as: 'videos' });
Videos.belongsTo(Semanas, { foreignKey: 'semana_id', as: 'semana' });

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/niveles', nivelRoutes);
app.use('/api/grupos', grupoRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/videos', videoRoutes);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('La base de datos se conecto correctamente');
        app.listen(PORT, () => {
            console.log(`El servidor esta corriendo en el puerto ${PORT}`);
            console.log('Esperando peticiones...');
        });
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });