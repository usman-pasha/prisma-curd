import { PrismaClient } from "@prisma/client";
import { encryptData } from "../api/middlewares/encryption";
import jsonData from "./admin.json";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const createAdmin = async () => {
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
      console.log("Saved Admin", admin.username);
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

// export default createAdmin;

const Initialise = async () => {
  try {
    const admins = await createAdmin();
    console.log("Admin Created");
  } catch (err) {
    console.log(err);
    return;
  }
  process.exit(0);
};
Initialise();
