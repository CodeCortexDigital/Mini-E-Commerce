import api from "../services/api";

export type Product = {
  _id?: string;
  id?: string | number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
  numReviews?: number;
  reviewCount?: number;
  image?: string;
  reviews?: Array<{
    user: string;
    name: string;
    rating: number;
    comment: string;
    createdAt?: string;
  }>;
};

// Get all products from API
export const fetchProducts = async (params?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sort?: string;
}): Promise<Product[]> => {
  try {
    const response = await api.get("/products", { params });
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Create product (Admin only)
export const createProduct = async (productData: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await api.post("/products", productData);
    return response.data.product || null;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

// Update product (Admin only)
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.product || null;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};

// Delete product (Admin only)
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete product");
  }
};
