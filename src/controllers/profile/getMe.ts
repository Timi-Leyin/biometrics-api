import { Request, Response } from "express";

export default (req: any, res: Response) => {
  try {
    res.status(200).json({
      msg: "Profile Retrieved",
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
