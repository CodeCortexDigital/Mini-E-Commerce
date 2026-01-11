export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
};

export const products: Product[] = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 20, description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.", category: "Electronics", stock: 15, rating: 4.5, reviewCount: 24 },
  { id: 2, name: "Smart Watch Pro", price: 30, description: "Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant design for active lifestyles.", category: "Electronics", stock: 8, rating: 4.8, reviewCount: 42 },
  { id: 3, name: "Classic Denim Jacket", price: 40, description: "Timeless denim jacket made from premium cotton. Perfect fit with modern styling. Ideal for casual wear and all seasons.", category: "Clothing", stock: 20, rating: 4.2, reviewCount: 18 },
  { id: 4, name: "Designer Leather Jacket", price: 50, description: "Luxury genuine leather jacket with premium craftsmanship. Stylish design that never goes out of fashion. Limited edition piece.", category: "Clothing", stock: 0, rating: 4.9, reviewCount: 56 },
  { id: 5, name: "Premium Leather Wallet", price: 60, description: "Handcrafted genuine leather wallet with multiple card slots and cash compartment. Slim design fits perfectly in your pocket.", category: "Accessories", stock: 12, rating: 4.6, reviewCount: 31 },
  { id: 6, name: "Sunglasses Aviator", price: 70, description: "Classic aviator sunglasses with UV protection and polarized lenses. Stylish design with durable frame. Perfect for outdoor activities.", category: "Accessories", stock: 5, rating: 4.7, reviewCount: 28 },
];
