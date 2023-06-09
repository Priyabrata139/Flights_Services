'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Airplane);
      
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        targetKey:'code',
        as: 'departureAirport'
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        targetKey:'code',
        as: 'arrivalAirport'
      });
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId'
      });
      // this.belongsTo(models.Airport);
    }
  }
  flights.init({
    flightNumber: {
      type:DataTypes.STRING,
      unique:true
    },
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    departureAirportId:{
      type: DataTypes.STRING,
      allowNull:false
    },
    arrivalAirportId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    arrivalTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    departureTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate: {
      type:DataTypes.STRING
    },
    totalSeats: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'flights',
  });
  return flights;
};