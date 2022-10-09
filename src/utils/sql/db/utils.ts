import mysql, { Connection, FieldInfo, MysqlError } from 'mysql';
import { Sequelize } from 'sequelize';
import {
  initArticleLineModel, initArticleModel, initTagArticleModel, initTagModel, initUserModel,
} from '../../../model/sql/index.js';

function getConSeq():Sequelize {
  const {
    DB_NAME, DB_ADMIN, DB_ADMIN_PASS, DB_SQL_HOST, DB_SQL_PORT,
  } = process.env;

  const connect = new Sequelize(
    DB_NAME || '',
    DB_ADMIN || '',
    DB_ADMIN_PASS || '',
    {
      host: DB_SQL_HOST,
      port: Number(DB_SQL_PORT),
      dialect: 'mariadb',
    },
  );

  return connect;
}

export default getCon;

function initialize() {
  initTagModel();
  initUserModel();
  initArticleModel();
  initArticleLineModel();
  initTagArticleModel();
}

function getCon(): Connection {
  const {
    DB_NAME, DB_ADMIN, DB_ADMIN_PASS, DB_SQL_HOST, DB_SQL_PORT,
  } = process.env;
  const con: Connection = mysql.createConnection({
    host: DB_SQL_HOST,
    port: Number(DB_SQL_PORT),
    user: DB_ADMIN,
    password: DB_ADMIN_PASS,
    database: DB_NAME,
  });
  return con;
}

async function queryPromise<T>(
  con: Connection,
  sentence: string,
):Promise<{ results: T[], fields: FieldInfo[] }> {
  return new Promise((resolve, reject) => {
    con.query(sentence, (err: MysqlError, results: T[], fields: FieldInfo[]) => {
      if (err) reject(err);
      else resolve({ results, fields });
    });
  });
}

async function queryValuePromise<T>(
  con: Connection,
  sentence: string,
  values: T,
):
  Promise<{ result: T[], values: T }> {
  return new Promise((resolve, reject) => {
    con.query(sentence, values, (err: MysqlError | null, result: T[]) => {
      if (err) reject(err);
      else resolve({ result, values });
    });
  });
}

async function queryInsertPromise<T>(
  con: Connection,
  sentence: string,
  values: T,
  idStr = 'id',
):
  Promise<{ result: T[], valuesId: T }> {
  return new Promise((resolve, reject) => {
    con.query(sentence, values, (err, result) => {
      if (err) reject(err);
      else resolve({ result, valuesId: { [idStr]: result.insertId, ...values } });
    });
  });
}

export {
  getConSeq,
  initialize,
  getCon,
  queryPromise,
  queryValuePromise,
  queryInsertPromise,
};
