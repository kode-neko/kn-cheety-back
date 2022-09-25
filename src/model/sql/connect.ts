import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { DB_NAME, DB_USER, DB_USER_PASS } = process.env;

let connect: Sequelize;

function getCon() {
  if (!connect) {
    connect = new Sequelize(
      DB_NAME || '',
      DB_USER || '',
      DB_USER_PASS || '',
      {
        host: 'localhost',
        port: 3011,
        dialect: 'mariadb',
      },
    );
  }
  return connect;
}

export default getCon;
