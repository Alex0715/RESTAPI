import setResponse from "./../../../api/response/response.helper";
import express from "express";
import UsersModel from "../../models/Users.model";
import sequelize from "../../db/connection";
import TokenHandler from "../../authorization/jwt.helper";
import BlogsModel from "../../models/Blogs.model";

export class Controller {
  addUser = async (req: express.Request, res: express.Response) => {
    try {
      const reqBody: any = req.body;
      let { username, password } = reqBody;
      const userCreation = await sequelize.transaction(async (t: any) => {
        const responseData = await UsersModel.create(reqBody, {
          transaction: t,
        });
      });
      return setResponse.success(res, 200, {
        message: "User Added",
        error: false,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };

  login = async (req: express.Request, res: express.Response) => {
    try {
      let username = req.body.username as string;
      let password = req.body.password as string;
      const userData: any = await UsersModel.findOne({
        where: { username: username },
      });
      if (!userData) {
        return setResponse.error(res, 401, {
          message: "Unknown User",
          error: false,
        });
      }
      if (userData.password === password) {
        const token = await TokenHandler.generateToken(userData.userId);
        if (!token.error) {
          return setResponse.success(res, 200, {
            token: token.data,
            message: "Successful Login",
            error: false,
          });
        }
        return setResponse.error(res, 500, {
          message: token.message,
          error: true,
        });
      }
      return setResponse.success(res, 401, {
        message: "Invalid Username or Password",
        error: true,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };

  addBlog = async (req: express.Request, res: express.Response) => {
    try {
      const reqBody: any = req.body;
      const userId = req.userId;
      await BlogsModel.create({
        title: reqBody.title,
        body: reqBody.body,
        userId: userId,
      });

      return setResponse.success(res, 200, {
        message: "Blog Added",
        error: false,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };

  getAllBlogs = async (req: express.Request, res: express.Response) => {
    try {
      const limit = parseInt(req.params.limit);
      const offset = parseInt(req.params.offset);
      const response = await BlogsModel.findAndCountAll({
        limit: limit,
        offset: offset,
      });
      return setResponse.success(res, 200, {
        data: response,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };

  getMyBlogs = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.userId;
      const limit = parseInt(req.params.limit);
      const offset = parseInt(req.params.offset);
      const response = await BlogsModel.findAndCountAll({
        where: { userId: userId },
        limit: limit,
        offset: offset,
      });
      return setResponse.success(res, 200, {
        data: response,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };

  updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const reqBody: any = req.body;
      const id = req.params.blogId;
      let udpateHook: boolean = false;
      await BlogsModel.update(reqBody, {
        where: { id: id },
        individualHooks: udpateHook,
      });
      return setResponse.success(res, 200, {
        message: "Blog Updated",
        error: false,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };

  deleteUser = async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.blogId;
      const response = await BlogsModel.destroy({
        where: { id: id },
      });
      return setResponse.success(res, 200, {
        message: "Blog Deleted",
        error: false,
      });
    } catch (error: any) {
      return setResponse.error(res, 500, {
        message: error.message,
        error: true,
      });
    }
  };
}

export default new Controller();
