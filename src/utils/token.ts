import jwt from "jsonwebtoken";

export const createJWT = async (payload: any) => {
  return await jwt.sign(payload, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};


export const verifyJWT = async (token: string) => {
  return await jwt.verify(token, process.env.JWT_SECRET as string);
};
