import AppError from "../core/appError";
import prisma from "../core/db";
import logger from "../core/log";
import { signToken } from "../middlewares/token";

import { user, Prisma } from "@prisma/client";


class userService {
  createRecord = async (object: any) => {
    const record: any = await prisma.user.create({ data: object });
    return record;
  };

  async getRecord(where: any) {
    const user: any = await prisma.user.findUnique({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
      },
    });
    return user;
  }

  getAllRecords = async (where: any) => {
    const record: any = await prisma.user.findMany({ where: where });
    return record;
  };
}

const getUserByEmail = async <Key extends keyof user>(
  email: string,
  keys: Key[] = [
    "id",
    "email",
    "username",
    "password",
    "phoneNumber",
    "firstLogin",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<user, Key> | null> => {
  const record = await prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) as any,
  });

  return record
    ? keys.reduce(
        (obj, k) => ({ ...obj, [k]: record[k] }),
        {} as Pick<user, Key>
      )
    : null;
};

export default new userService();
