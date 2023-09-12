import { DataTypes } from "sequelize";
import db from "../config/db";

const Events = db.define("Events", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Events;
