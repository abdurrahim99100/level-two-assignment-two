import { Product_ } from "../product/product.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

// createOrder
const createOrderService = async (data: Order) => {
  try {
    const findProduct = await Product_.findOne({
      _id: data?.productId,
    });

    if (!findProduct) {
      return { success: false, message: "Product not found" };
    }

    const productQuantity = findProduct.inventory.quantity;

    if (productQuantity < data.quantity) {
      return { success: false, message: "Not enough inventory available" };
    }

    const newQuantity = productQuantity - data.quantity;
    const inStock = newQuantity > 0;

    await Product_.findOneAndUpdate(
      { _id: data?.productId },
      {
        $set: {
          "inventory.quantity": newQuantity,
          "inventory.inStock": inStock,
        },
      }
    );

    const result = await OrderModel.create(data);

    return {
      success: true,
      message: "Order created successfully!",
      result,
    };
  } catch (e) {
    return { success: false, message: "Order not found" };
  }
};

//get all orders
const getAllOrdersService = async () => {
  const result = await OrderModel.find();
  return result;
};

// find order with customer email
const getCustomerOrders = async (email: string) => {
  const result = await OrderModel.find({ email: email });
  return result;
};

export const orderService = {
  createOrderService,
  getAllOrdersService,
  getCustomerOrders,
};
