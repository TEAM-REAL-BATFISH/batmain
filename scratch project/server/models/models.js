//import { Pool } from 'pg';
import pkg from 'pg';
const { Pool } = pkg;


const PG_URI = 'postgres://idklsxyj:QVrCWd-Mxub3TsH1yUBbFuYnznIAOK5P@isilo.db.elephantsql.com/idklsxyj';
const saltRounds = 10;

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });

  async function hashPassword (password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } 
  

  
  // We export an object that contains a property called query,
  // which is a function that returns the invocation of pool.query() after logging the query
  // This will be required in the controllers to be the access point to the database
  export function db () {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };