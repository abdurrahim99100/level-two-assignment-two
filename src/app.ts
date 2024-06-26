import express, { Request, Response } from "express";
import productRouter from "./modules/product/product.router";
import orderManagementRouter from "./modules/orderManagement/order.router";
const app = express();
app.use(express.json());

// PRODUCT ROUTER;
app.use("/api/products", productRouter);

// ORDER ROUTER;
app.use("/api/orders", orderManagementRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "SERVER IS RUNNING SUCCESSFULLY!" });
});

// ROUTER NOT FOUNT;
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// const apple = 10;

// EXPORT APP;
export default app;
