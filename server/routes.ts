import express, { Application } from "express";
import UserRouter from "./api/controllers/users/router";

export default function routes(app: Application): void {
  app.use("/user/api/v1", UserRouter);
}
