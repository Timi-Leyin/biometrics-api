import { Request, Response } from "express";

export default (req:Request, res:Response)=>{
    res.status(404).json({
        msg:"Oops, Route Not Found"
    })
}