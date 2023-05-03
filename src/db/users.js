const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class Users extends Model {}

Users.init(
  {
    _id: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

export default Users;
