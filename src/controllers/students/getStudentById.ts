import { Request, Response } from "express";
import Student from "../../models/Student";

export default async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (student) {
      return res.status(200).json({
        msg: "Retrieved Student",
        data: student,
      });
    }

    return res.status(404).json({
      msg: "Student Not Found ",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
