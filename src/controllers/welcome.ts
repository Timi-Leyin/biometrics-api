import { Request, Response } from "express";

export default (req:Request, res:Response)=>{
    res.status(200).json({msg:"Welcome to Biometrics API"})
}