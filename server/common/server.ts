import http from "http";
import express, { Application } from "express";
import bodyParser from "body-parser";
import path from "path";
import CONFIG from "../api/config";
import os from "os";
import cors from "cors";

const fileupload = require("express-fileupload");

const app: any = express();
app.get("/status", (req: express.Request, res: express.Response) => {
  console.log("SUCCESS");
});
export default class ExpressServer {
  constructor() {
    app.use(fileupload());
    const root = path.normalize(__dirname + "/../..");
    app.use(bodyParser.json({ limit: CONFIG.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: CONFIG.REQUEST_LIMIT || "100kb",
      })
    );
    app.use(cors());
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      console.log(
        `up and running in ${
          CONFIG.PORT || "development"
        } @: ${os.hostname()} on port: ${p}}
        Chat Websocket running in port 8080`
      );
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
