const mysql = require('mysql2/promise');
const config = require('../config/db');


async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);
    connection.end();
    return results;
}
  
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
  
  module.exports = {
    query ,emptyOrRows
  }