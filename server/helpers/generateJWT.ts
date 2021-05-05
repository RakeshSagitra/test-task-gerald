import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from "../dto/constants";

const generateJWT = (cellNumber: string) => {
  return jwt.sign({ cellNumber }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export default generateJWT;
