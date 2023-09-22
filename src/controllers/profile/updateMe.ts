import { Request, Response } from "express";

export default (req: any, res: Response) => {
  try {
    
    

  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
