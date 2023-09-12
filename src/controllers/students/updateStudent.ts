import { Request, Response } from "express";
import Student from "../../models/Student";

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

    await Student.update(
      {
        name: req.body.name,
        matric_no: req.body.matric_no,
        department: req.body.department,
        full_name:req.body.full_name,
        level: req.body.level,
        pin: req.body.pin,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );

    return res.status(200).json({
      msg: "Student Updated",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
