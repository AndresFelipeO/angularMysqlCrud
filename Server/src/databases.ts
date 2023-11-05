import mysql from 'mysql2/promise';
import keys from './keys'

const pool=mysql.createPool(keys.database);


(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('DB is connected');
  
      // Realiza tus operaciones de base de datos aquí
      // Ejemplo: const results = await connection.query('SELECT * FROM ...');
      connection.release(); // Libera la conexión cuando hayas terminado
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  })();

export default pool; 