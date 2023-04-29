const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");
import tokenLastLogin from "../utils/tokenLastLogin";

class Users extends Model {}

Users.init(
  {
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

Users.afterUpdate((users, options) => {
  tokenLastLogin[0] = users.token;
  console.log(tokenLastLogin);
});

export default Users;
