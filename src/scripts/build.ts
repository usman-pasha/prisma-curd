// import { PrismaClient } from "@prisma/client";
// import AppError from "../core/appError";
// import logger from "../core/log";
// import { encryptData, decryptData } from "../utils/encryption";
// const prisma = new PrismaClient();

// class userService {
//   async register(body: any) {
//     logger.info("creating user");
//     if (!body.name) {
//       throw new AppError(400, "Required Parameters", "Required User Name");
//     }
//     const p = encryptData(body.password);
//     logger.data("p-enc", p);
//     const d = decryptData(p);
//     logger.data("p-enc", d);
//     const payload: any = {
//       name: body.name,
//       email: body.email,
//       password: p,
//       status: "active",
//     };
//     logger.data("created", payload);
//     // const user = await prisma.user.create({ data: payload });
//     // logger.data("user", user);
//     // return user;
//     return payload;
//   }
//   // private calculateMetaData(
//   //   totalItems: number,
//   //   dataLength: number,
//   //   limit: any,
//   //   page: any
//   // ) {
//   //   const meta = {
//   //     totalItems: totalItems,
//   //     itemCount: dataLength,
//   //     itemsPerPage: parseInt(limit, 10),
//   //     totalPages: Math.ceil(totalItems / parseInt(limit, 10)),
//   //     currentPage: parseInt(page, 10),
//   //   };
//   //   return meta;
//   // }
//   private calculateMetaData(
//     totalItems: number,
//     dataLength: number,
//     limit: number,
//     page: number
//   ) {
//     const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
//     const prevPage = page - 1 === 0 ? null : page - 1;
//     const nextPage = page < totalPages ? page + 1 : null;

//     const meta = {
//       totalItems: totalItems,
//       itemCount: dataLength,
//       itemsPerPage: limit,
//       totalPages: totalPages,
//       currentPage: page,
//       nextPage: nextPage,
//       prevPage: prevPage,
//     };
//     return meta;
//   }

//   async getAllUsers(page: any = 2, limit: any = 5, order: any = "desc") {
//     const userCount = await prisma.user.count();
//     const users = await prisma.user.findMany({
//       skip: (page - 1) * limit,
//       take: parseInt(limit),
//       orderBy: {
//         id: order,
//       },
//     });
//     const m = this.calculateMetaData(userCount, users.length, 5, 1);
//     const response = {
//       items: users,
//       m,
//     };
//     return response;
//   }

//   async getAllUseruu(pageNo: any, sizeValue: any) {
//     let page = pageNo ? parseInt(pageNo, 10) : 1;
//     let size = sizeValue ? parseInt(sizeValue, 10) : 100;
//     let skip = page > 1 ? (page - 1) * size : 0;
//     logger.info(`pageNo = ${page} & size = ${size} & skip = ${skip}`);
//     // let where = { AND: [{ status: "inactive" }, { name: "siraj" }] };
//     let where = { OR: [{ status: "active" }, { name: "siraj" }] };
//     // let where = { NOT: [{ status: "inactive" }, { name: "siraj" }] };
//     const data = await prisma.user.findMany({
//       where: where,
//       include: {
//         product: {
//           select: {
//             id: true,
//             user: true,
//           },
//         },
//       },
//       skip: skip,
//       take: size,
//       orderBy: {
//         id: "asc",
//       },
//     });

//     const total = await prisma.user.findMany({
//       where: where,
//     });
//     const totalDocs = total.length;
//     const totalPages = Math.max(Math.ceil(total.length / size), 1);
//     const prevPage = page - 1 === 0 ? null : page - 1;
//     const nextPage = page < totalPages ? page + 1 : null;

//     return {
//       docs: data,
//       totalDocs,
//       limit: size,
//       totalPages,
//       page,
//       pagingCounter: (page - 1) * size + 1,
//       hasPrevPage: !(prevPage === null),
//       hasNextPage: !(nextPage === null),
//       prevPage,
//       nextPage,
//     };
//   }

//   async getOneUser(where: any) {
//     const user: any = await prisma.user.findUnique({
//       where,
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         email: true,
//         status: true,
//         user_has_roles: {
//           select: {
//             roleId: true,
//           },
//         },
//       },
//     });
//     return user;
//   }

// async getProducts() {
//   const record = await prisma.product.findMany({
//     include: {
//       user: {
//         select: {
//           id: true,
//         },
//       },
//     },
//   });
//   return record;
// }

//   async createRecord(payload: any) {
//     const record: any = await prisma.user.create({ data: payload });
//     return record;
//   }
// }

// export default new userService();
