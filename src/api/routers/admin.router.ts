import { Router } from "express";
import { catchError } from "../core/catchError";
import { verifyToken, authorizePermissions } from "../middlewares/auth";
import adminController from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.route("/").get(catchError(adminController.adminRegister));

export default adminRouter;
