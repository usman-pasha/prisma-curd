import { Router } from "express";
import { catchError } from "../core/catchError";
import { verifyToken } from "../middlewares/auth";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter
  .route("/")
  .post(verifyToken, catchError(productController.createProduct))
  .get(catchError(productController.getAllProducts));

productRouter
  .route("/:productId")
  .get(catchError(productController.getOneProduct));

export default productRouter;
