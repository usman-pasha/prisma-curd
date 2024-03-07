import AppError from "../core/appError";
import prisma from "../core/db";
import logger from "../core/log";

class itemsService {
  async createItem(body: any) {
    logger.info("creating Item");
    if (!body.productId || !body.quantity)
      throw new AppError(400, "Required Prameters");

    const getProduct = await prisma.product.findUnique({
      where: { id: parseInt(body.productId) },
    });
    if (!getProduct) {
      throw new AppError(404, "Product not found");
    }
    if (getProduct.quantity === 0 && getProduct.quantity <= 0) {
      throw new AppError(400, "Product not available");
    }
    const quantity = parseInt(body.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      throw new AppError(400, "Invalid quantity");
    }
    const priceValue: number = getProduct.price.toNumber();
    const subtotal: any = priceValue * quantity;
    const payload: any = {
      productId: body.productId,
      quantity: quantity,
      subtotal: subtotal,
      userId: parseInt(body.userId),
    };
    const record = await prisma.orderItem.create({ data: payload });
    await prisma.order.create({
      data: {
        customerId: body.userId,
        status: "Pending"
      },
    });
    return record;
  }

  async getAllItems() {
    logger.info("get all Products");
    const items: any | null = await prisma.orderItem.findMany({
      where: {},
      select: {
        id: true,
        // userId:true,
        quantity: true,
        subtotal: true,
        product: {
          select: {
            id: true,
            productName: true,
            price: true,
          },
        },
      },
    });
    return items;
  }

  async getOneProduct(itemId: any) {
    logger.info("get one product");
    const record: any | null = await prisma.orderItem.findUnique({
      where: { id: parseInt(itemId) },
      select: {
        id: true,
        // userId:true,
        quantity: true,
        subtotal: true,
        product: {
          select: {
            id: true,
            productName: true,
            price: true,
          },
        },
      },
    });
    return record;
  }
}

export default new itemsService();
