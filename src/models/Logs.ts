import { DataTypes } from "sequelize";
import db from "../config/db";

const Logs = db.define("Logs", {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Logs;
