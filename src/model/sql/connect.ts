import { Sequelize } from 'sequelize';
import { envSelect } from '../../utils';

envSelect('dev');

const {
  DB_NAME, DB_USER, DB_USER_PASS, DB_SQL_HOST, DB_SQL_PORT,
} = process.env;

let connect: Sequelize;

function getCon() {
  if (!connect) {
    connect = new Sequelize(
      DB_NAME || '',
      DB_USER || '',
      DB_USER_PASS || '',
      {
        host: DB_SQL_HOST,
        port: Number(DB_SQL_PORT),
        dialect: 'mariadb',
      },
    );
  }
  return connect;
}

export default getCon;
