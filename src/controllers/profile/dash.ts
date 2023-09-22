import { Request, Response } from "express";
import Attendance from "../../models/Attendance";
import Student from "../../models/Student";
import Events from "../../models/Events";

export default async(req: any, res: Response) => {
  try {
   const Att = await Attendance.findAndCountAll();
   const Stu = await Student.findAndCountAll();
   const Ev = await Events.findAndCountAll();

    res.status(200).json({
        msg:"Retrieved Data",
        data:{
            total_attendance:Att.count,
            total_students:Stu.count,
            total_events:Ev.count,
            profile: req.user   
        }
    })
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
