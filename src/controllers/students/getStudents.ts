import { Request, Response } from "express";
import Student from "../../models/Student";

export default async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll();
    res.status(200).json({
      msg: "Retrieved Students",
      data: students || [],
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
