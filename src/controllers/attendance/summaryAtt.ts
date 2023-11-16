import { Request, Response } from "express";
import Student from "../../models/Student";
import Attendance from "../../models/Attendance";
import Events from "../../models/Events";

const summaryAtt =async (req:Request, res:Response) => {
    const studentRec = await Student.findAll((req.query.department) ?{
        where:{
            department:req.query.department 
        }
    }:undefined);

    const events = await Events.findAndCountAll()

   const studentData:any=[];


  for(const student of studentRec){
    const attendance = await Attendance.findAndCountAll({
        where:{
            uuid: await student.get().uuid
        }
    });

   studentData.push({
    uuid:await student.get().uuid,
    department:await student.get().department,
    attended:attendance.count,
    total:events.count,
    name:await student.get().name,
    level:await student.get().level,
    matric_no:await student.get().matric_no,
   })

   }

//    console.log(studentData)

     res.status(200).json({
        data:{
            department:req.query.department || "All",
            records: studentData
        }
    })
}

export default summaryAtt;