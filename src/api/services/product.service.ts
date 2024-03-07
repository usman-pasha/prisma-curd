import AppError from "../core/appError";
import prisma from "../core/db";
import logger from "../core/log";
import { v4 as uuidv4 } from "uuid";

class productService {
  async createProduct(body: any) {
    logger.info("creating Product");
    if (!body.productName || !body.price || !body.categoryId)
      throw new AppError(400, "Required Prameters");
    const payload: any | null = {
      description: body.description,
      productCode: uuidv4(),
      productName: body.productName,
      price: parseFloat(body.price),
      categoryId: body.categoryId,
      quantity: parseInt(body.quantity),
      adminId: body.userId,
    };
    const record = await prisma.product.create({ data: payload });
    return record;
  }

  async getAllProducts() {
    logger.info("get all Products");
    const user: any | null = await prisma.product.findMany({
      select: {
        id: true,
        productName: true,
        productCode: true,
        description: true,
        price: true,
        quantity: true,
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        admin: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return user;
  }

  async getOneProduct(productId: any) {
    logger.info("get one product");
    const record: any | null = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      select: {
        id: true,
        productName: true,
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        admin: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return record;
  }
}

export default new productService();
