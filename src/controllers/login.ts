import { Request, Response } from "express";

export default (req:Request, res:Response)=>{
    console.log(req.body)
}