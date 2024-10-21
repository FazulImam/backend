const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Memory = sequelize.define("Memory", {
  obituaryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mortuaryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  images: [
    {
      userId: Sequelize.INTEGER,
      imageUrl: Sequelize.STRING,
      isVerified: Sequelize.BOOLEAN,
    },
  ],
  messages: [
    {
      userId: Sequelize.INTEGER,
      text: Sequelize.STRING,
      isVerified: Sequelize.BOOLEAN,
    },
  ],
});

module.exports = Memory;
