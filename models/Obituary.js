const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Orbituary = sequelize.define("Orbituary", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  town: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.ENUM("male", "female"),
    allowNull: false,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY,
  },
  dateOfDeath: {
    type: Sequelize.DATEONLY,
  },
  imageUrl: Sequelize.STRING,
  cemetry: Sequelize.STRING,
  funeralDay: Sequelize.DATEONLY,
  funeralTime: Sequelize.TIME,
  mortuaryId: Sequelize.INTEGER,
});

module.exports = Orbituary;
