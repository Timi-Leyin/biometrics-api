import { Request, Response } from "express";
import Attendance from "../../models/Attendance";
import { Op } from "sequelize";
import Student from "../../models/Student";
import sequelize from "sequelize/types/sequelize";
import db from "../../config/db";

export default async (req: Request, res: Response) => {
  try {
    const query: any = {
      where: {},
    };

    if (req.query.name) {
      query.where.name = {
        [Op.like]: db.literal(`'%${req.query.name}%'`),
      };
    }

    // console.log(req.query)

    if (req.query.event && typeof req.query.event == "string") {
      query.where.event = req.query.event.split("-")[1].trim();

      query.where.date = {
        [Op.like]: db.literal(
          `'%${String(
            new Date(req.query.event.split("-")[0]).toLocaleDateString()
          )}%'`
        ),
      };
      console.log(query.where.date);
    }

    if (req.query.id) {
      query.where.uuid = req.query.id;
    }

    // if (req.query.date) {
    //   query.where.date = {
    //     [Op.eq]: new Date(req.query.date as string).toLocaleDateString(),
    //   };
    // }
    // if (req.query.time) {
    //   query.where.time = {
    //     [Op.gte]: req.query.time,
    //   };
    // }

    const att = await Attendance.findAll(query);

    if (Boolean(req.query.absent)) {
      // @TODO: FIND THE ABSENTS
      const presentStudents = att.map((st) => st.get());
      const allStudents = await Student.findAll(query);
      const notPresentStudents = allStudents.filter((s) => {
        const student = s.get();

        return !presentStudents.some(
          (presentStudent) => presentStudent.uuid === student.uuid
        );
      });
      return res.json({
        msg: "Retrieved Absent Students",
        data: notPresentStudents || [],
      });
    }

    return res.status(200).json({
      msg: "Retrieved Present Students",
      data: att || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
