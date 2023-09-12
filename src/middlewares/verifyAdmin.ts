import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/token";
import User from "../models/User";

export default async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ msg: "Invalid Authorization" });
    }

    const bearer = req.headers.authorization.split(" ");

    if (bearer.length == 2) {
      let t = bearer[1];
      return verifyJWT(t)
        .then(async (data: any) => {
          if (!data.uuid) {
            return res.status(403).json({ msg: "Invalid User" });
          }

          const userExists = await User.findOne({
            where: {
              uuid: data.uuid,
            },
          });

          if (!userExists) {
            return res.status(403).json({ msg: "Invalid User" });
          }

          req.user = userExists.get();
          next();
        })
        .catch((err) => {
          return res.status(403).json({ msg: "Token Expired" });
        });
    }

    return res.status(403).json({ msg: "Invalid Bearer Token" });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
