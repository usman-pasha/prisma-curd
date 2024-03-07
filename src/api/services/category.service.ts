import AppError from "../core/appError";
import prisma from "../core/db";
import logger from "../core/log";

class categoryService {
  async createcategory(body: any) {
    logger.info("creating category");
    if (!body.categoryName) throw new AppError(400, "Required Category Name");
    const payload: any | null = {
      categoryName: body.categoryName,
      description: body.description,
      adminId: body.userId,
    };
    const record = await prisma.category.create({ data: payload });
    return record;
  }

  async getAllCategories() {
    logger.info("get all categories");
    const user: any | null = await prisma.category.findMany({
      select: {
        id: true,
        categoryName: true,
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

  async getOneCategory(categoryId: any) {
    logger.info("get one category");
    const record: any | null = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
      select: {
        id: true,
        categoryName: true,
        admin: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    const { user: userData, ...rest } = record || {}; // Destructure 'user' to 'userData'

    return { ...rest, userData }; // Return object with 'userData' alias
    // return record;
  }
}

export default new categoryService();
