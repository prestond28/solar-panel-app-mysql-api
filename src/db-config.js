import mysql from 'mysql';
import { CREATE_USERS_TABLE } from './queries/user.queries.js';
import { CREATE_ENERGY_TABLE, LOAD_DATA_INTO_ENERGY_TABLE } from './queries/data.queries.js';
import query from './utils/query.js';

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'solardb';

const connection = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
      multipleStatements: true,
      localInfile: true
    });

    con.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
    });

    resolve(con);
  });

// Create the connection with required details
(async () => {
  const _con = await connection().catch((err) => {
    throw err;
  });

  const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  const dataTableCreated = await query(_con, CREATE_ENERGY_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );

  const dataTableLoaded = await query(_con, LOAD_DATA_INTO_ENERGY_TABLE).catch(
    (err) => {
      console.log(err);
    }
  );
})();

export default connection;