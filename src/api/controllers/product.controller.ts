import logger from "../core/log";
import responser from "../core/responser";
import { Request, Response } from "express";
import productService from "../services/product.service";

class productController {
  async createProduct(req: Request, res: Response) {
    logger.info("Product starting");
    const reqData: any = req.body;
    reqData.userId = res.locals.userId;
    const data: any = await productService.createProduct(reqData);
    return responser.send(200, "Product Created Successfully", req, res, data);
  }

  async getAllProducts(req: Request, res: Response) {
    logger.info("get All Products starting");
    const data: any = await productService.getAllProducts();
    return responser.send(
      200,
      "Successfully Fetched All Products",
      req,
      res,
      data
    );
  }
  async getOneProduct(req: Request, res: Response) {
    logger.info("get One Product starting");
    const params = req.params.productId;
    const data: any = await productService.getOneProduct(params);
    return responser.send(
      200,
      "Successfully Fetched One Product",
      req,
      res,
      data
    );
  }
}

export default new productController();
