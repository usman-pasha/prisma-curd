import adminRouter from "./admin.router";
import authRouter from "./auth.router";
import categoryRouter from "./category.router";
import itemsRouter from "./items.router";
import productRouter from "./product.router";

const routes: any = (app: any) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/item", itemsRouter);
};

export default routes;
