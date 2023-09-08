import { Sequelize } from "sequelize";


const db = new Sequelize(
  process.env.SQL_DATABASE as string,
  process.env.SQL_USER as string,
  process.env.SQL_PASS as string,
  {
    host: process.env.SQL_HOST as string,
    dialect: "mysql", // Use the appropriate dialect for your database (e.g., 'mysql', 'postgres', 'sqlite')
  }
);

export default db;
