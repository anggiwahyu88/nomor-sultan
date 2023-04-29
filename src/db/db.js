import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.Db_table_name,
  process.env.Db_username,
  process.env.Db_password,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
