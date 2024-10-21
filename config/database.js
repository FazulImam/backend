const Sequelize = require("sequelize");

const sequelize = new Sequelize("funeral", "postgres", "admin", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
