const sequelize = require('./config/database');
const Nivel = require('./models/Niveles');
const Curso = require('./models/Cursos');

async function check() {
    try {
        console.log('Checking database table structure for niveles...');
        const [results] = await sequelize.query("DESCRIBE niveles");
        console.table(results);

        console.log('Testing Nivel.findAll()...');
        const niveles = await Nivel.findAll({
            include: [{
                model: Curso,
                as: 'curso',
                attributes: ['id', 'nombre']
            }],
            order: [['orden', 'ASC']]
        });
        console.log(`Found ${niveles.length} levels.`);

    } catch (error) {
        console.error('Diagnostic failed:', error);
    } finally {
        await sequelize.close();
    }
}

check();
