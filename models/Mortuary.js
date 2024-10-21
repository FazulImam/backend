const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Mortuary = sequelize.define("Mortuary", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mortuary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Mortuary;
