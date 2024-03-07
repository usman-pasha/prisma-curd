import AppError from "../core/appError";
import prisma from "../core/db";
import logger from "../core/log";
import { signToken } from "../middlewares/token";
import { encryptData } from "../middlewares/encryption";
import jsonData from "../../scripts/admin.json";
import { v4 as uuidv4 } from "uuid";

class adminService {
  async createAdmin() {
    try {
      const admins = JSON.parse(JSON.stringify(jsonData.admins));
      for (const admin of admins) {
        const isExist = await prisma.user.findUnique({
          where: { email: admin.email },
        });
        if (isExist) {
          console.log("Already Admin =", admin.email, "Exists");
          continue;
        }
        const password = encryptData(admin.password);
        const uniqueUserName = `ADM${uuidv4()
          .toUpperCase()
          .replace(/-/g, "")
          .substring(0, 9)}`;
        const object = {
          firstName: admin.firstName,
          lastName: admin.lastName,
          uuid: uuidv4(),
          username: uniqueUserName,
          password: password,
          email: admin.email,
          phoneNumber: admin.phoneNumber,
          emailIsVerified: admin.emailIsVerified,
          phoneIsVerified: admin.phoneIsVerified,
          accountType: admin.accountType,
          status: admin.status,
          updatedAt: new Date(),
          createdAt: new Date(),
        };
        const insert = await prisma.user.createMany({ data: object });
        console.log("Saved Admin", admin.email, admin.phoneNumber);
        return insert;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  // Todo implement login
}

export default new adminService();
