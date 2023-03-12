import CONFIG from "../config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import RESPONSE from "../response/response.helper";
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    userRole?: string;
  }
}
export class TokenHandler {
  generateToken = async (userId: string) => {
    try {
      const expiryTime = CONFIG.JWT.EXPIRES_IN as string;
      if (!expiryTime) {
        throw new Error("Expires in env missing");
      }
      const payload = {
        aud: userId,
      };
      const secret = CONFIG.JWT.ACCESS_SECRET as string;
      const options = {
        expiresIn: expiryTime,
        issuer: CONFIG.JWT.ISSUER,
      };
      const token = jwt.sign(payload, secret, options);
      if (!token) {
        throw new Error("ERROR IN TOKEN CREATION");
      }
      return {
        data: token,
        error: false,
        message: "Token Created Succesfully",
        status: RESPONSE.success,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  };

  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;
      if (!token)
        return RESPONSE.error(res, 401, {
          message: "empty Token",
          error: true,
        });
      let aud;
      let resp = jwt.verify(
        token,
        CONFIG.JWT.ACCESS_SECRET as string,
        (err, data: any) => {
          if (err) {
            throw err;
          }
          aud = data.aud;
        }
      );
      req.userId = aud;
      return next();
    } catch (error: any) {
      return RESPONSE.error(res, 401, {
        error: true,
        message: error.message,
      });
    }
  };
}
export default new TokenHandler();
