import { Router } from "express";
import { catchError } from "../core/catchError";
import { verifyToken, authorizePermissions } from "../middlewares/auth";
import itemsController from "../controllers/items.controller";

const itemsRouter = Router();
itemsRouter.use(verifyToken);
itemsRouter.route("/").post(catchError(itemsController.createOrderItem));

export default itemsRouter;
