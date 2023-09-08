import { DataTypes } from "sequelize";
import db from "../config/db";
import { ROLES } from "../config/main";

const Student = db.define("Student", {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  matric_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;
