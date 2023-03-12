import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import setResponse from "../response/response.helper";

export const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

export class ValidationHandler {
  signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody = req.body;
      const transSchema = Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
      });
      const { error } = transSchema.validate(reqBody, options);
      if (error) throw new Error("Validation Error");
      return next();
    } catch (error: any) {
      return setResponse.error(res, 400, {
        message: error.message,
        error: true,
      });
    }
  };

  addBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody = req.body;
      const transSchema = Joi.object({
        title: Joi.string().trim().required(),
        body: Joi.string().trim().required(),
      });
      const { error } = transSchema.validate(reqBody, options);
      if (error) throw new Error("Validation Error");
      return next();
    } catch (error: any) {
      return setResponse.error(res, 400, {
        message: error.message,
        error: true,
      });
    }
  };

  editBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody = req.body;
      const transSchema = Joi.object({
        title: Joi.string().trim(),
        body: Joi.string().trim(),
      });
      const { error } = transSchema.validate(reqBody, options);
      if (error) throw new Error("Validation Error");
      return next();
    } catch (error: any) {
      return setResponse.error(res, 400, {
        message: error.message,
        error: true,
      });
    }
  };
}
export default new ValidationHandler();
