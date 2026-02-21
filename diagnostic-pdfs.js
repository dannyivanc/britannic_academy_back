const sequelize = require('./config/database');
const Curso = require('./models/Cursos');
const Nivel = require('./models/Niveles');
const Unidades = require('./models/Unidades');
const Pdfs = require('./models/Pdfs');

// Set up associations
Curso.hasMany(Nivel, { foreignKey: 'curso_id', as: 'niveles' });
Nivel.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });
Nivel.hasMany(Unidades, { foreignKey: 'nivel_id', as: 'unidades' });
Unidades.belongsTo(Nivel, { foreignKey: 'nivel_id', as: 'nivel' });
Unidades.hasOne(Pdfs, { foreignKey: 'unidad_id', as: 'pdf' });
Pdfs.belongsTo(Unidades, { foreignKey: 'unidad_id', as: 'unidad' });

async function check() {
    try {
        console.log('--- Checking PDFs joining Niveles ---');
        const pdfs = await Pdfs.findAll({
            include: [{
                model: Unidades,
                as: 'unidad',
                include: [{
                    model: Nivel,
                    as: 'nivel',
                    include: [{ model: Curso, as: 'curso' }]
                }]
            }]
        });
        console.log(`Success! Found ${pdfs.length} PDFs.`);
    } catch (error) {
        console.error('Diagnostic failed:', error.message);
        if (error.original) console.error('Original:', error.original.message);
    } finally {
        await sequelize.close();
    }
}

check();
