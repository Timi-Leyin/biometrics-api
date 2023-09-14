import { Request, Response } from "express";
import Events from "../../models/Events";
import db from "../../config/db";

export default async (req: Request, res: Response) => {
  try {
    const ev = await Events.findAll({
        attributes: [[db.fn('DISTINCT', db.col("name")), 'uniqueValues']],
    });

    res.status(200).json({
      msg: "All Events",
      data: ev || [],
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
