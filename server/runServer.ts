import Server from "./common/server";
import routes from "./routes";
import CONFIG from "./api/config";

const port: number = CONFIG.PORT;
new Server().router(routes).listen(port);
