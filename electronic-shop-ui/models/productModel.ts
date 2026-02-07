import { Category } from "./categoryModel";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}
