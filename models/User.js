const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    alllowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  // isVerified: {
  //   type: Sequelize.BOOLEAN,
  //   default: false,
  // },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  role: {
    type: Sequelize.ENUM("super", "admin", "keeper", "user"),
    defaultValue: "user",
  },
});

module.exports = User;
