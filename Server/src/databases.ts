import { Sequelize } from "sequelize";
import keys from './keys'; // Importa la configuración de las keys

const sequelize = new Sequelize(keys.database, {
    dialect: 'mysql',
    host: keys.host,
    username: keys.user,
    password: keys.password,
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Llamamos a la función para probar la conexión
testDatabaseConnection();
export default sequelize;