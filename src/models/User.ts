import { DataTypes } from "sequelize";
import db from "../config/db";

const User = db.define("User", {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate email format using Sequelize
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "admin",
  },
});

export default User;
