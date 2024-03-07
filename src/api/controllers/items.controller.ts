import logger from "../core/log";
import responser from "../core/responser";
import { Request, Response } from "express";
import itemsService from "../services/items.service";

class itemsController {
  async createOrderItem(req: Request, res: Response) {
    logger.info("createOrderItem starting");
    const reqData: any = req.body;
    reqData.userId = res.locals.userId;
    const data: any = await itemsService.createItem(reqData);
    return responser.send(
      201,
      "Successfully Order Item Created",
      req,
      res,
      data
    );
  }
}
export default new itemsController();
