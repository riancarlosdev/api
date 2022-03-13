import mysql from 'mysql2/promise';

const main = async () => mysql.createConnection({
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export { main };
