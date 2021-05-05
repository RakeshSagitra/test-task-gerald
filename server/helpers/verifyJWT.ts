import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../dto/constants";

const verifyJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const auth = req.headers["authorization"];
  const jwtToken = auth && auth.split(" ")[1];

  if (!jwtToken) {
    return res.sendStatus(401);
  }

  jwt.verify(jwtToken, JWT_SECRET_KEY, (error: any, decodedObject: any) => {
    if (error) {
      return res.sendStatus(403);
    }

    req.params.phone = decodedObject.cellNumber;
    next();
  });
};

export default verifyJWT;
