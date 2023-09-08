import { Request, Response } from "express";
import Student from "../models/Student";

export default async (req: Request, res: Response) => {
  try {
    const studentExists = await Student.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    // IF STUDENT NOT EXISTS
    if (!studentExists) {
      return res.status(400).json({
        msg: "Student With ID not Found",
      });
    }

    // await Student.update(
    //   {
    //     uuid: req.params.id,
    //   },
    //   {
    //     uuid: req.body.uuid,
    //     name: req.body.name,
    //     matric_no: req.body.matric_no,
    //     department: req.body.department,
    //     level: req.body.level,
    //     pin: req.body.pin,
    //   }
    // );

    return res.status(200).json({
      msg: "Student Updated",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
