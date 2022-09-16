require('dotenv').config();
const mysql = require('mysql');

const {
  DB_NAME, DB_ADMIN, DB_ADMIN_PASS, DB_SQL_HOST, DB_SQL_PORT,
} = process.env;

let con;

function getCon() {
  if (!con) {
    con = mysql.createConnection({
      host: DB_SQL_HOST,
      port: DB_SQL_PORT,
      user: DB_ADMIN,
      password: DB_ADMIN_PASS,
      database: DB_NAME,
    });
  }
  return con;
}

async function queryPromise(sentence) {
  return new Promise((resolve, reject) => {
    getCon().query(sentence, (err, results, fields) => {
      if (err) reject(err);
      else resolve({ results, fields });
    });
  });
}

async function queryValuePromise(sentence, values) {
  return new Promise((resolve, reject) => {
    getCon().query(sentence, values, (err, result) => {
      if (err) reject(err);
      else resolve({ result, values });
    });
  });
}

async function queryInsertPromise(sentence, values, idStr = 'id') {
  return new Promise((resolve, reject) => {
    getCon().query(sentence, values, (err, result) => {
      if (err) reject(err);
      else resolve({ result, valuesId: { [idStr]: result.insertId, ...values } });
    });
  });
}

module.exports = {
  getCon,
  queryPromise,
  queryValuePromise,
  queryInsertPromise,
};
