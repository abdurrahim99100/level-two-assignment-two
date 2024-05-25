import { z } from "zod";

const OrderSchema = z.object({
  email: z.string().email("Invalid email format"),
  productId: z.string(),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

// Extract the TypeScript type from the Zod schema
type Order = z.infer<typeof OrderSchema>;

export { OrderSchema, Order };
