import { DataTypes } from "sequelize";
import db from "../config/db";

const Attendance = db.define("Attendance", {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Attendance;
