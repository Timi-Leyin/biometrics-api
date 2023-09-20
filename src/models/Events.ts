import { DataTypes } from "sequelize";
import db from "../config/db";

const Events = db.define("Events", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique:true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique:true
  },
  dateTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Events;
