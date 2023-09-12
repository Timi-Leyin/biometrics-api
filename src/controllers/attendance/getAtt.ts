import { Request, Response } from "express";
import Attendance from "../../models/Attendance";
import { Op } from "sequelize";

export default async (req: Request, res: Response) => {
  const query: any = {
    where: {},
  };

  if (req.query.name) {
    query.where.name = req.query.name;
  }

  if (req.query.event) {
    query.where.event = req.query.event;
  }
  if (req.query.id) {
    query.where.uuid = req.query.id;
  }

  if (req.query.date) {
    query.where.date = {
      [Op.gte]: req.query.date,
    };
  }
  if (req.query.time) {
    query.where.time = {
      [Op.gte]: req.query.time,
    };
  }

  const att = await Attendance.findAll(query);

  res.status(200).json({
    msg: "",
    data: att || [],
  });
  //    }
};
