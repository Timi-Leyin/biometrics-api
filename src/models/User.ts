import { DataTypes } from "sequelize";
import db from "../config/db";
import { ROLES } from "../config/main";

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
      isEmail: true, 
    },
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: ROLES.moderator,
  },
  root: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
