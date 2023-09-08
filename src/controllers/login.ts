import { Request, Response } from "express";
import User from "../models/User";
import { decrypt } from "../utils/hash";

export default async (req: Request, res: Response) => {
  try {
    const userExists = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // CHECK IF USER EXITS
    if (userExists) {
      const { password, uuid } = userExists.get({ plain: true });
      const passwordsMatch = await decrypt(req.body.password, password);

      //   IF THE PASSWORD MATCHES THE DATABASE RECORD
      if (passwordsMatch) {
        // @TODO: Generate Token
        return res.status(200).json({
          msg: "Login Successful",
          token:""
        });
      }
    }
    // IF USERNAME NOT FOUND
    return res.status(404).json({
      msg: "Credentials Not Found",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
