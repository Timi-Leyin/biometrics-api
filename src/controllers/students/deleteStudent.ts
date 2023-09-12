import { Request, Response } from "express";
import Student from "../../models/Student";

export default async (req: Request, res: Response) => {
  try {
    const studentDeleted = await Student.destroy({
      where: {
        uuid: req.params.id,
      },
    });

    if (studentDeleted) {
      return res.status(200).json({
        msg: "Student Deleted",
      });
    }

    return res.status(404).json({
      msg: "Student With ID not Found",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
