import mysql, { Connection, FieldInfo, MysqlError } from 'mysql';

const {
  DB_NAME, DB_ADMIN, DB_ADMIN_PASS, DB_SQL_HOST, DB_SQL_PORT,
} = process.env;

let con: Connection;

function getCon(): Connection {
  if (!con) {
    con = mysql.createConnection({
      host: DB_SQL_HOST,
      port: Number(DB_SQL_PORT),
      user: DB_ADMIN,
      password: DB_ADMIN_PASS,
      database: DB_NAME,
    });
  }
  return con;
}

async function queryPromise<T>(sentence: string):Promise<{ results: T[], fields: FieldInfo[] }> {
  return new Promise((resolve, reject) => {
    getCon().query(sentence, (err: MysqlError, results: T[], fields: FieldInfo[]) => {
      if (err) reject(err);
      else resolve({ results, fields });
    });
  });
}

async function queryValuePromise<T>(sentence: string, values: T):
Promise<{ result: T[], values: T }> {
  return new Promise((resolve, reject) => {
    getCon().query(sentence, values, (err: MysqlError | null, result: T[]) => {
      if (err) reject(err);
      else resolve({ result, values });
    });
  });
}

async function queryInsertPromise<T>(sentence: string, values: T, idStr = 'id'):
Promise<{ result: T[], valuesId: T }> {
  return new Promise((resolve, reject) => {
    getCon().query(sentence, values, (err, result) => {
      if (err) reject(err);
      else resolve({ result, valuesId: { [idStr]: result.insertId, ...values } });
    });
  });
}

export {
  getCon,
  queryPromise,
  queryValuePromise,
  queryInsertPromise,
};
