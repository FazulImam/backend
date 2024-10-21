const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Florist = sequelize.define("Florist", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  city: { type: Sequelize.STRING },
  workingTime: {
    type: Sequelize.DATE,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Florist;
