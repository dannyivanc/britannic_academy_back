const sequelize = require('./config/database');
const Curso = require('./models/Cursos');
const Nivel = require('./models/Niveles');

// Set up associations (mirroring index.js)
Curso.hasMany(Nivel, { foreignKey: 'curso_id', as: 'niveles' });
Nivel.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });

async function check() {
    try {
        console.log('--- Checking Niveles with Associations ---');

        console.log('1. Checking raw table structure using DESCRIBE...');
        const [results] = await sequelize.query("DESCRIBE niveles");
        results.forEach(col => {
            console.log(`Column: ${col.Field}, Type: ${col.Type}`);
        });

        console.log('\n2. Testing Nivel.findAll() with include...');
        const niveles = await Nivel.findAll({
            include: [{
                model: Curso,
                as: 'curso',
                attributes: ['id', 'nombre']
            }],
            order: [['orden', 'ASC']]
        });
        console.log(`\nFound ${niveles.length} levels.`);

        console.log('\n3. Testing fixObjectUrls...');
        const { fixObjectUrls } = require('./utils/urlHelper');
        const transformed = fixObjectUrls(niveles, ['imagen_url', 'logo_url']);

        if (transformed.length > 0) {
            console.log('Sample transformed data (first 1):');
            const sample = transformed[0];
            console.log(`ID: ${sample.id}, Nombre: ${sample.nombre}, logo_url: ${sample.logo_url}`);
            console.log('Curso association:', sample.curso ? JSON.stringify(sample.curso) : 'MISSING!');
        }
        if (niveles.length > 0) {
            console.log('Sample level data (first 1):');
            const sample = niveles[0].toJSON();
            console.log(`ID: ${sample.id}, Nombre: ${sample.nombre}, logo_url: ${sample.logo_url}`);
        }

    } catch (error) {
        console.error('\n--- DIAGNOSTIC FAILED ---');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.original) {
            console.error('Original Error:', error.original.message);
        }
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

check();
