import logger from "../core/log";
import responser from "../core/responser";
import { Request, Response } from "express";
import adminService from "../services/admin.service";

class adminController {
  async adminRegister(req: Request, res: Response) {
    logger.info("admin registration starting");
    const data: any = await adminService.createAdmin();
    logger.info(data);
    return responser.send(200, "Admin Register Successfully", req, res, data);
  }
}

export default new adminController();
