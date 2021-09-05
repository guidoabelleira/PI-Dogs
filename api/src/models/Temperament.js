const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Temperament', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }
  );
};