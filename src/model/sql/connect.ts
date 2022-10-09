import { Sequelize } from 'sequelize';

let connect: Sequelize;

function getCon() {
  const {
    DB_NAME, DB_USER, DB_USER_PASS, DB_SQL_HOST, DB_SQL_PORT,
  } = process.env;
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
