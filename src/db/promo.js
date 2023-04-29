const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Promo extends Model {}

Promo.init(
  {
    nomor1: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: 0,
    },
    nomor2: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: 0,
    },
    nomor3: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: 0,
    },

    harga: {
      type: DataTypes.STRING,
    },
    promo: {
      type: DataTypes.ENUM("couple", "buy 2 get 3"),
      validate: {
        isIn: {
          args: [["couple", "buy2get3"]],
          msg: "Invalid value for promo",
        },
      },
    },
    promoId: {
      type: DataTypes.STRING,
      defaultValue: 0,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "promo",
  }
);

export default Promo;
