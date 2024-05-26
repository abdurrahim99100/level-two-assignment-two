import { Request, Response } from "express";
import { productService } from "./product.service";
import { ProductSchema } from "./product.zod.validation";

// CREATE PRODUCT CONTROLLER;
const createProductController = async (req: Request, res: Response) => {
  try {
    const productValidation = ProductSchema.safeParse(req.body);

    //zod validation
    if (productValidation.success) {
      const result = await productService.createProductService(
        productValidation.data
      );

      //send response to client site
      res.status(200).json({
        success: true,
        message: "Product created successfully!",
        data: result,
      });
    } else {
      //send error to client site

      const errorPath = productValidation.error.issues.map((errorData) =>
        errorData.path.map((path) => path)
      )[0][0];

      res.status(500).json({
        success: false,
        message: "Product Not created!",
        data: `${
          productValidation.error?.errors.map((data) => data.message)[0]
        }; ${errorPath && `Check {${errorPath}} Path`}`,
      });
    }
  } catch (e) {
    //send error to client site
    res.status(500).json({
      success: false,
      message: "Product not create successfully!",
      error: e,
    });
  }
};

// get all product data
const getAllProductData = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    if (searchTerm) {
      const result = await productService.searchProductWithProductNameService(
        searchTerm
      );

      //send response search result to client site
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      const result = await productService.getAllProductService();

      // SEND RESPONSE TO CLIENT SIDE;
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (e) {
    // SEND ERROR TO CLIENT SIDE;
    res.status(500).json({
      success: false,
      message: "Products not fetched!",
      error: e,
    });
  }
};

//get single product with product id
const getOneProductBuyId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getOneProductService(productId);

    //send response to client site
    res.status(200).json(result);
  } catch (e) {
    //send error to client site
    res.status(500).json({
      success: false,
      message: "Product not fetched!",
      error: e,
    });
  }
};

// update product with product id
const updateOneProductData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.updateOneProductService(
      productId,
      req.body
    );

    //send response to client site
    res.status(200).json(result);
  } catch (e) {
    //send error to client site
    res.status(500).json({
      success: false,
      message: "Product not updated try again!",
      error: e,
    });
  }
};

// delete product with product id

const deleteOneProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.productDeleteWithIdService(productId);

    //send response to client site
    res.status(200).json(result);
  } catch (e) {
    //send error to client site
    res.status(500).json({
      success: false,
      message: "Product not deleted try again!",
      error: e,
    });
  }
};

export const productController = {
  createProductController,
  getAllProductData,
  getOneProductBuyId,
  updateOneProductData,
  deleteOneProduct,
};
