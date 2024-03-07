import express, { Request, Response } from "express";
import cors from "cors";
import logger from "./api/core/log";
import responser from "./api/core/responser";
import SwaggerUi from "swagger-ui-express";
import * as swaggerDocs from "./swagger/rule.json";
import routes from "./api/routers";
import { globalError } from "./api/core/globalError";
import morgan from "morgan";

const app = express();
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());
app.options("*", cors());

app.use(morgan("dev"));

app.use("/Docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));

routes(app);

app.get("/api/v1", (req: Request, res: Response) => {
  logger.info(`Get Api Request`);
  const data: any = "working fine";
  return responser.send(200, "health check up", req, res, data);
});

app.all("*", (req: Request, res: Response) => {
  return responser.send(
    404,
    `${req.originalUrl} EndPoint Not Found`,
    req,
    res,
    ""
  );
});

app.use(globalError);

export default app;
