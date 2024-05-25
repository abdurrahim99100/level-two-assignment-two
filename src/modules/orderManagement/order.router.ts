import express from "express";
import { orderController } from "./order.controller";

const orderManagementRouter = express.Router();

orderManagementRouter.post("/", orderController.createOrder);
orderManagementRouter.get("/", orderController.getAllOrders);

export default orderManagementRouter;
