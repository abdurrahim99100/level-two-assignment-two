import express from "express";
import { productController } from "./product.controller";

const productRouter = express.Router();
// CREATE A PRODUCT;
productRouter.post("/", productController.createProductController);
// GET ALL PRODUCT;
productRouter.get("/", productController.getAllProductData);
// GET ONE PRODUCT UPDATE ------------------;
productRouter.get("/:productId", productController.getOneProductBuyId);
// UPDATE ON PRODUCT;
productRouter.put("/:productId", productController.updateOneProductData);
// DELETE ON PRODUCT;
productRouter.delete("/:productId", productController.deleteOneProduct);

// FINAL EXPORT PRODUCT ROUTER;
export default productRouter;
