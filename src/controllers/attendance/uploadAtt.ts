import { Request, Response } from "express";
import fs from "fs";
import Attendance from "../../models/Attendance";
import Events from "../../models/Events";
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

    await Events.findOrCreate({
      where: {
        name: req.body.event,
      },
    });

    req.files.forEach((file: any) => {
      const logString = file.buffer.toString().trim();
      if (logString) {
        const logLn = logString.split("\n");
        logLn.shift();
        logLn.forEach(async (log_arr: any) => {
          const log = log_arr.split("\t");
          const [no, mchn, en_no, name, mode, io_md, dateTime] = log;
          await Attendance.create({
            uuid: String(Number(en_no)).trim(),
            event: req.body.event .trim(),
            name:name.trim(),
            time: new Date(dateTime).toLocaleTimeString(),
            date: new Date(dateTime).toLocaleDateString(),
          });
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
