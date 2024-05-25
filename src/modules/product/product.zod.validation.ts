import { z } from "zod";

// validation with zod
const VariantSchema = z.object({
  type: z.string().nonempty("Type is required"),
  value: z.string().nonempty("Value is required"),
});

const InventorySchema = z.object({
  quantity: z.number().nonnegative("Quantity must be a non-negative number"),
  inStock: z.boolean(),
});

const ProductSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string()).nonempty("Tags are required"),
  variants: z.array(VariantSchema).nonempty("Variants are required"),
  inventory: InventorySchema,
});

type Variant = z.infer<typeof VariantSchema>;
type Inventory = z.infer<typeof InventorySchema>;
type Product = z.infer<typeof ProductSchema>;

export { ProductSchema, Variant, Inventory, Product };
