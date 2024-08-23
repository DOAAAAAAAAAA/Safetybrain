//mysql2  ----------------> oracle
//npm install oracledb
//npm i oracledb

// 필요한 모듈을 가져옵니다.
const oracledb = require('oracledb');
// oracledb.autoCommit = true
oracledb.initOracleClient({ libDir: '../../instantclient_11_2' });

// Oracle 연결 정보를 설정합니다.
  let conn = oracledb.createConnection({
    user: 'cgi_24IS_IoT3_p2_1', 
    password: 'smhrd1', 
    connectString: 'project-db-cgi.smhrd.com:1524'  
  // 호스트:포트/서비스명
  });

  conn.connect();

  module.exports = conn;