import express from "express";
import TokenHandler from "../../authorization/jwt.helper";
import Validation from "../../validation/validation.helper";
import Controller from "./controller";

const router = express.Router();

router.get("/allBlogs/:limit/:offset", Controller.getAllBlogs);
router.get(
  "/blogs/:limit/:offset",
  TokenHandler.verifyToken,
  Controller.getMyBlogs
);
router.post("/addUser", Controller.addUser);
router.post("/login", Validation.signin, Controller.login);
router.post(
  "/blogs",
  Validation.addBlog,
  TokenHandler.verifyToken,
  Controller.addBlog
);
router.patch(
  "/blogs/:blogId",
  Validation.editBlog,
  TokenHandler.verifyToken,
  Controller.updateUser
);
router.delete(
  "/blogs/:blogId",
  TokenHandler.verifyToken,
  Controller.deleteUser
);

export default router;
