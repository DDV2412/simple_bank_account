require("dotenv").config();

module.exports = {
  development: {
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    database: String(process.env.DB_NAME),
    host: String(process.env.DB_HOST),
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
