import { Request, Response } from "express";
import fs from "fs";
import Attendance from "../../models/Attendance";
import Events from "../../models/Events";
import Student from "../../models/Student";
export default async (req: any, res: Response) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        msg: "Logs Field is Required",
      });
    }

    if (!req.body.event) {
      return res.status(400).json({
        msg: "Event is Required",
      });
    }

    req.files.forEach((file: any) => {
      const logString = file.buffer.toString().trim();
      if (logString) {
        const logLn = logString.split("\n");
        logLn.shift();
        logLn.forEach(async (log_arr: any, i: number) => {
          const log = log_arr.split("\t");
          const [no, mchn, en_no, name, mode, io_md, dateTime] = log;

          const ev = dateTime.split(" ")[0] + " - " + req.body.event.trim();

          if (i == 0) {
            const eventExists = await Events.findOne({
              where: {
                date: dateTime.split(" ")[0],
              },
            });

            if (!eventExists) {
              await Events.create({
                name: ev,
                date: dateTime.split(" ")[0],
                dateTime,
              });
            }
          }

          // Make sure the attendace record removes
          const att_exists = await Attendance.findOne({
            where: {
              uuid: String(Number(en_no)).trim(),
              event: req.body.event.trim(),
              date: new Date(dateTime).toLocaleDateString(),
            },
          });

          if (!att_exists) {
            await Attendance.create({
              uuid: String(Number(en_no)).trim(),
              event: req.body.event.trim(),
              name: name.trim(),
              time: String(new Date(dateTime).toLocaleTimeString()),
              date: new Date(dateTime).toLocaleDateString(),
              dateTime,
            });
          }
          else{
            console.log("Already Existed, Skipping")
          }
        });
      } else {
        throw "Error in Log";
      }
    });

    return res.status(201).json({
      msg: "Attendance Uploaded",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
