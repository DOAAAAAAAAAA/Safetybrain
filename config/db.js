//mysql2  ----------------> oracle
//npm install oracledb
//npm i oracledb

const oracledb = require('oracledb');
// oracledb.autoCommit = true
oracledb.initOracleClient({ libDir: '../../instantclient_11_2' });

const dbConfig = {
  user: 'cgi_24IS_IoT3_p2_1', 
  password: 'smhrd1', 
  connectString: 'project-db-cgi.smhrd.com:1524' 
}

async function connectToOracle() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
        console.log('Successfully connected to Oracle database');
        return connection;
    

  } catch (err) {
    console.error('Connection failed: ', err);
  }
}

connectToOracle()
module.exports = connectToOracle