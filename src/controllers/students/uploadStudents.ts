import { Request, Response } from "express";
import fs from "fs";
// import Attendance from "../../models/Attendance";
import Events from "../../models/Events";
import Student from "../../models/Student";
export default async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        msg: "Logs Field is Required",
      });
    }

    const logString = req.file.buffer.toString().trim();
    if (logString) {
      const log_arr = logString.trim().split("\n");
      log_arr.shift();
      log_arr.forEach(async (log_arr: any) => {
        const log = log_arr.split(",");
        const [id, name, matric, dept, pin, level] = log;
        const student_exists = await Student.findOne({
          where: {
            uuid: String(Number(id)).trim(),
          },
        });

        if (!student_exists) {
          await Student.create({
            uuid: String(Number(id)).trim(),
            name: name.trim(),
            full_name: name.trim(),
            matric_no: matric,
            department: dept,
            level,
            pin,
          });
        }
      });
    } else {
      throw "Error in Log";
    }

    return res.status(201).json({
      msg: "Students Uploaded",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
