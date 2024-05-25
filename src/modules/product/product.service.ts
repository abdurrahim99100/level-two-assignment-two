import { Product } from "./product.interface";
import { Product_ } from "./product.model";

//const create product
const createProductService = async (productData: Product) => {
  const result = await Product_.create(productData);
  return result;
};

//get all product

const getAllProductService = async () => {
  const result = await Product_.find();
  return result;
};

//get one product data

const getOneProductService = async (productId: string) => {
  try {
    const result = await Product_.findOne({ _id: productId });
    return {
      success: true,
      message: "Product fetched successfully!",
      data: result,
    };
  } catch (e) {
    return { success: false, message: "Product not found" };
  }
};

//update one product with product id

const updateOneProductService = async (productId: string, data: Product) => {
  try {
    const result = await Product_.updateOne(
      { _id: productId },
      { $set: data },
      { new: true }
    );

    const updatedData =
      result.acknowledged && result.matchedCount
        ? { success: true, message: "Product updated successfully!", data }
        : {};

    return updatedData;
  } catch (e) {
    return {
      success: false,
      message: "Product not found!",
    };
  }
};

//product delete with product id

const productDeleteWithIdService = async (id: string) => {
  try {
    const result = await Product_.deleteOne({ _id: id });
    const deleteProduct =
      result.acknowledged && result.deletedCount
        ? null
        : "Product not deleted try again!";
    return {
      success: true,
      message: "Product deleted successfully!",
      data: deleteProduct,
    };
  } catch (e) {
    return {
      success: false,
      message: "Product not found!",
    };
  }
};

//search product with product name

const searchProductWithProductNameService = async (searchText: string) => {
  const result = await Product_.find({
    $or: [
      { name: new RegExp(searchText, "i") },
      { category: new RegExp(searchText, "i") },
      { description: new RegExp(searchText, "i") },
    ],
  });
  return result;
};

export const productService = {
  createProductService,
  getAllProductService,
  getOneProductService,
  updateOneProductService,
  productDeleteWithIdService,
  searchProductWithProductNameService,
};
