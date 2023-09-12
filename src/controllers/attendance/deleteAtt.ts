import { Request, Response } from "express";
import Attendance from "../../models/Attendance";

export default async (req: Request, res: Response) => {
  try {
    const AttendanceDeleted = await Attendance.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (AttendanceDeleted) {
      return res.status(200).json({
        msg: "Attendance Deleted",
      });
    }

    return res.status(404).json({
      msg: "Attendance With ID not Found",
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
