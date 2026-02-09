import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import User from '../models/User';
import Product from '../models/Product';
import Category from '../models/Category';
import Brand from '../models/Brand';
import Settings from '../models/Settings';

dotenv.config();

const brands = [
  { name: 'Nike', slug: 'nike', description: 'Athletic wear and sportswear brand' },
  { name: 'Adidas', slug: 'adidas', description: 'Sports apparel and footwear' },
  { name: 'Zara', slug: 'zara', description: 'Contemporary fashion brand' },
  { name: 'H&M', slug: 'h-and-m', description: 'Affordable fashion retailer' },
  { name: 'Ralph Lauren', slug: 'ralph-lauren', description: 'Luxury fashion house' },
  { name: "Levi's", slug: 'levis', description: 'Iconic denim brand' },
  { name: 'Tommy Hilfiger', slug: 'tommy-hilfiger', description: 'Classic American style' },
  { name: 'Uniqlo', slug: 'uniqlo', description: 'Japanese casual wear' },
];

const categories = [
  { name: 'T-Shirts', slug: 't-shirts', description: 'Casual and stylish t-shirts' },
  { name: 'Shirts', slug: 'shirts', description: 'Formal and casual shirts' },
  { name: 'Jeans', slug: 'jeans', description: 'Denim jeans in various styles' },
  { name: 'Pants', slug: 'pants', description: 'Trousers and casual pants' },
  { name: 'Jackets', slug: 'jackets', description: 'Outerwear and jackets' },
  { name: 'Sweaters', slug: 'sweaters', description: 'Warm knitwear and sweaters' },
  { name: 'Hoodies', slug: 'hoodies', description: 'Comfortable hooded sweatshirts' },
  { name: 'Shorts', slug: 'shorts', description: 'Casual summer shorts' },
];

const products = [
  { name: 'Nike Sportswear Club T-Shirt', description: 'Classic cotton t-shirt with Nike logo', price: 29.99, category: 'T-Shirts', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-TS-001', featured: true, bestseller: true, newArrival: false },
  { name: 'Nike Dri-FIT Training T-Shirt', description: 'Moisture-wicking performance tee', price: 34.99, category: 'T-Shirts', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-TS-002', featured: false, bestseller: false, newArrival: true },
  { name: 'Nike Tech Fleece Hoodie', description: 'Premium fleece hoodie with modern fit', price: 89.99, category: 'Hoodies', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-HD-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Nike Sportswear Windrunner Jacket', description: 'Lightweight jacket with iconic chevron design', price: 99.99, category: 'Jackets', brand: 'Nike', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-JK-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Nike Sportswear Joggers', description: 'Comfortable fleece joggers', price: 59.99, category: 'Pants', brand: 'Nike', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Nike Flex Shorts', description: 'Stretch woven shorts for active lifestyle', price: 44.99, category: 'Shorts', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-SH-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Nike Club Crew Sweatshirt', description: 'Classic crewneck sweatshirt', price: 54.99, category: 'Sweaters', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-SW-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Nike Air Polo Shirt', description: 'Performance polo with breathable fabric', price: 49.99, category: 'Shirts', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-SH-002', featured: false, bestseller: false, newArrival: true },
  { name: 'Nike Essential Running Jacket', description: 'Weather-resistant running jacket', price: 84.99, category: 'Jackets', brand: 'Nike', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-JK-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Nike Standard Issue Basketball Pants', description: 'Relaxed fit basketball pants', price: 64.99, category: 'Pants', brand: 'Nike', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'NIKE-PT-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Essentials 3-Stripes T-Shirt', description: 'Iconic 3-stripes cotton tee', price: 27.99, category: 'T-Shirts', brand: 'Adidas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-TS-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Adidas Trefoil T-Shirt', description: 'Classic logo tee', price: 32.99, category: 'T-Shirts', brand: 'Adidas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-TS-002', featured: true, bestseller: false, newArrival: false },
  { name: 'Adidas Adicolor Classics Hoodie', description: 'Retro-inspired hoodie', price: 79.99, category: 'Hoodies', brand: 'Adidas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-HD-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Tiro Track Jacket', description: 'Sporty track jacket', price: 69.99, category: 'Jackets', brand: 'Adidas', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-JK-001', featured: false, bestseller: false, newArrival: true },
  { name: 'Adidas Tiro Training Pants', description: 'Tapered training pants', price: 54.99, category: 'Pants', brand: 'Adidas', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Essentials Chelsea Shorts', description: 'Classic cut shorts', price: 34.99, category: 'Shorts', brand: 'Adidas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-SH-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Sport Crew Sweatshirt', description: 'Comfortable crew sweatshirt', price: 59.99, category: 'Sweaters', brand: 'Adidas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-SW-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Advantage Polo', description: 'Classic polo shirt', price: 44.99, category: 'Shirts', brand: 'Adidas', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Own The Run Jacket', description: 'Lightweight running jacket', price: 89.99, category: 'Jackets', brand: 'Adidas', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-JK-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Adidas Z.N.E. Pants', description: 'Premium athletic pants', price: 74.99, category: 'Pants', brand: 'Adidas', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ADIDAS-PT-002', featured: true, bestseller: false, newArrival: false },
  { name: 'Zara Basic T-Shirt', description: 'Essential cotton t-shirt', price: 19.99, category: 'T-Shirts', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-TS-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Zara Textured Weave Shirt', description: 'Casual textured shirt', price: 39.99, category: 'Shirts', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-SH-001', featured: false, bestseller: false, newArrival: true },
  { name: 'Zara Slim Fit Chinos', description: 'Modern slim fit pants', price: 49.99, category: 'Pants', brand: 'Zara', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Zara Denim Jacket', description: 'Classic denim jacket', price: 69.99, category: 'Jackets', brand: 'Zara', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-JK-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Zara Polo Shirt', description: 'Cotton pique polo', price: 29.99, category: 'Shirts', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Zara Hoodie Sweatshirt', description: 'Comfortable hoodie', price: 39.99, category: 'Hoodies', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-HD-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Zara Faded Slim Jeans', description: 'Slim fit denim jeans', price: 45.99, category: 'Jeans', brand: 'Zara', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-JN-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Zara Bermuda Shorts', description: 'Smart casual shorts', price: 34.99, category: 'Shorts', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-SH-003', featured: false, bestseller: false, newArrival: false },
  { name: 'Zara Knit Sweater', description: 'Soft knit pullover', price: 49.99, category: 'Sweaters', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-SW-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Zara Oxford Shirt', description: 'Classic button-down shirt', price: 35.99, category: 'Shirts', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'ZARA-SH-003', featured: false, bestseller: false, newArrival: true },
  { name: 'H&M Cotton T-Shirt', description: 'Everyday basic tee', price: 14.99, category: 'T-Shirts', brand: 'H&M', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-TS-001', featured: false, bestseller: true, newArrival: false },
  { name: 'H&M Slim Fit Shirt', description: 'Modern fit dress shirt', price: 24.99, category: 'Shirts', brand: 'H&M', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-SH-001', featured: false, bestseller: false, newArrival: false },
  { name: 'H&M Slim Jeans', description: 'Classic slim fit jeans', price: 39.99, category: 'Jeans', brand: 'H&M', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-JN-001', featured: true, bestseller: false, newArrival: false },
  { name: 'H&M Hooded Sweatshirt', description: 'Soft fleece hoodie', price: 34.99, category: 'Hoodies', brand: 'H&M', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-HD-001', featured: false, bestseller: false, newArrival: false },
  { name: 'H&M Bomber Jacket', description: 'Classic bomber style', price: 59.99, category: 'Jackets', brand: 'H&M', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-JK-001', featured: false, bestseller: false, newArrival: true },
  { name: 'H&M Chino Pants', description: 'Versatile chino pants', price: 34.99, category: 'Pants', brand: 'H&M', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'H&M Linen Shorts', description: 'Lightweight summer shorts', price: 29.99, category: 'Shorts', brand: 'H&M', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'H&M Cable-Knit Sweater', description: 'Warm cable knit', price: 44.99, category: 'Sweaters', brand: 'H&M', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-SW-001', featured: false, bestseller: false, newArrival: false },
  { name: 'H&M Regular Fit Polo', description: 'Classic polo shirt', price: 19.99, category: 'Shirts', brand: 'H&M', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-SH-003', featured: false, bestseller: false, newArrival: false },
  { name: 'H&M Parka Jacket', description: 'Insulated winter parka', price: 99.99, category: 'Jackets', brand: 'H&M', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'HM-JK-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Classic Polo', description: 'Iconic polo with pony logo', price: 89.99, category: 'Shirts', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-PL-001', featured: true, bestseller: true, newArrival: false },
  { name: 'Ralph Lauren Oxford Shirt', description: 'Classic button-down oxford', price: 98.99, category: 'Shirts', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-SH-001', featured: false, bestseller: false, newArrival: true },
  { name: 'Ralph Lauren Crew Neck T-Shirt', description: 'Premium cotton tee', price: 49.99, category: 'T-Shirts', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-TS-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Cable-Knit Sweater', description: 'Luxury cable knit', price: 148.99, category: 'Sweaters', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-SW-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Chino Pants', description: 'Tailored chino pants', price: 98.99, category: 'Pants', brand: 'Ralph Lauren', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Windbreaker', description: 'Lightweight windbreaker', price: 128.99, category: 'Jackets', brand: 'Ralph Lauren', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-JK-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Fleece Hoodie', description: 'Premium fleece hoodie', price: 118.99, category: 'Hoodies', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-HD-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Classic Shorts', description: 'Tailored shorts', price: 79.99, category: 'Shorts', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-SH-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren Denim Shirt', description: 'Classic denim work shirt', price: 108.99, category: 'Shirts', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Ralph Lauren V-Neck Sweater', description: 'Merino wool v-neck', price: 138.99, category: 'Sweaters', brand: 'Ralph Lauren', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'RL-SW-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Levi's 511 Slim Fit Jeans', description: 'Classic slim fit denim', price: 69.99, category: 'Jeans', brand: 'Levi's', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-JN-001', featured: true, bestseller: true, newArrival: false },
  { name: 'Levi's 501 Original Jeans', description: 'Iconic straight fit jeans', price: 79.99, category: 'Jeans', brand: 'Levi's', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-JN-002', featured: false, bestseller: true, newArrival: false },
  { name: 'Levi's Graphic T-Shirt', description: 'Logo graphic tee', price: 29.99, category: 'T-Shirts', brand: 'Levi's', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-TS-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Levi's Denim Trucker Jacket', description: 'Classic trucker jacket', price: 98.99, category: 'Jackets', brand: 'Levi's', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-JK-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Levi's Western Shirt', description: 'Snap button western shirt', price: 59.99, category: 'Shirts', brand: 'Levi's', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-SH-001', featured: false, bestseller: false, newArrival: true },
  { name: 'Levi's Relaxed Fit Hoodie', description: 'Comfortable hoodie', price: 54.99, category: 'Hoodies', brand: 'Levi's', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-HD-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Levi's Chino Pants', description: 'Modern chino pants', price: 64.99, category: 'Pants', brand: 'Levi's', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Levi's Denim Shorts', description: '501 hemmed shorts', price: 54.99, category: 'Shorts', brand: 'Levi's', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Levi's Logo Hoodie', description: 'Logo front hoodie', price: 64.99, category: 'Hoodies', brand: 'Levi's', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-HD-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Levi's Vintage Tee', description: 'Vintage wash t-shirt', price: 34.99, category: 'T-Shirts', brand: 'Levi's', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'LEVIS-TS-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Classic Polo', description: 'Signature flag logo polo', price: 69.99, category: 'Shirts', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-PL-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Oxford Shirt', description: 'Classic fit oxford', price: 79.99, category: 'Shirts', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-SH-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Tommy Hilfiger Logo T-Shirt', description: 'Classic logo tee', price: 39.99, category: 'T-Shirts', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-TS-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Flag Hoodie', description: 'Signature flag hoodie', price: 89.99, category: 'Hoodies', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-HD-001', featured: false, bestseller: false, newArrival: true },
  { name: 'Tommy Hilfiger Bomber Jacket', description: 'Classic bomber jacket', price: 149.99, category: 'Jackets', brand: 'Tommy Hilfiger', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-JK-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Chinos', description: 'Slim fit chino pants', price: 79.99, category: 'Pants', brand: 'Tommy Hilfiger', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-PT-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Cotton Shorts', description: 'Classic fit shorts', price: 59.99, category: 'Shorts', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-SH-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger V-Neck Sweater', description: 'Cotton v-neck sweater', price: 89.99, category: 'Sweaters', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-SW-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Denim Shirt', description: 'Casual denim shirt', price: 89.99, category: 'Shirts', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Tommy Hilfiger Crew Sweatshirt', description: 'Logo crew sweatshirt', price: 79.99, category: 'Sweaters', brand: 'Tommy Hilfiger', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'TH-SW-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Uniqlo Supima Cotton T-Shirt', description: 'Premium cotton tee', price: 14.99, category: 'T-Shirts', brand: 'Uniqlo', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-TS-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Uniqlo Oxford Slim Shirt', description: 'Easy care oxford shirt', price: 29.99, category: 'Shirts', brand: 'Uniqlo', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-SH-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Uniqlo Ultra Stretch Jeans', description: 'Comfortable stretch jeans', price: 49.99, category: 'Jeans', brand: 'Uniqlo', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-JN-001', featured: false, bestseller: true, newArrival: false },
  { name: 'Uniqlo Blocktech Parka', description: 'Water-resistant parka', price: 79.99, category: 'Jackets', brand: 'Uniqlo', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-JK-001', featured: false, bestseller: false, newArrival: true },
  { name: 'Uniqlo Sweat Pullover Hoodie', description: 'Classic pullover hoodie', price: 29.99, category: 'Hoodies', brand: 'Uniqlo', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-HD-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Uniqlo Smart Ankle Pants', description: 'Modern ankle-length pants', price: 39.99, category: 'Pants', brand: 'Uniqlo', sizes: ['30', '32', '34', '36'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-PT-001', featured: true, bestseller: false, newArrival: false },
  { name: 'Uniqlo Dry-EX Shorts', description: 'Quick-dry active shorts', price: 29.99, category: 'Shorts', brand: 'Uniqlo', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-SH-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Uniqlo Extra Fine Merino Sweater', description: 'Soft merino crew neck', price: 49.99, category: 'Sweaters', brand: 'Uniqlo', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-SW-001', featured: false, bestseller: false, newArrival: false },
  { name: 'Uniqlo Pique Polo Shirt', description: 'Casual polo shirt', price: 19.99, category: 'Shirts', brand: 'Uniqlo', sizes: ['S', 'M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-SH-002', featured: false, bestseller: false, newArrival: false },
  { name: 'Uniqlo Ultra Light Down Jacket', description: 'Packable down jacket', price: 69.99, category: 'Jackets', brand: 'Uniqlo', sizes: ['M', 'L', 'XL'], colors: ['Beige', 'Navy', 'Black'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'], stock: 50, sku: 'UNIQLO-JK-002', featured: true, bestseller: false, newArrival: false },
];

const seedDatabase = async () => {
  try {
    await connectDatabase();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Settings.deleteMany({});

    console.log('👤 Creating admin user...');
    await User.create({
      name: 'Admin User',
      email: 'admin@mensclothing.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('🏢 Creating brands...');
    await Brand.insertMany(brands);

    console.log('📁 Creating categories...');
    await Category.insertMany(categories);

    console.log('👕 Creating products...');
    const productsWithRatings = products.map(product => ({
      ...product,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      numReviews: Math.floor(Math.random() * 50) + 10,
    }));
    await Product.insertMany(productsWithRatings);

    console.log('⚙️  Creating settings...');
    await Settings.create({
      siteName: "Men's Clothing Store",
      siteDescription: 'Premium clothing for modern men',
      contactEmail: 'contact@mensclothing.com',
      contactPhone: '+1-555-0123',
      shippingFee: 10,
      taxRate: 0.08,
      currency: 'USD',
    });

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${brands.length} brands created`);
    console.log(`   - ${categories.length} categories created`);
    console.log(`   - ${products.length} products created`);
    console.log('   - 1 admin user created (admin@mensclothing.com / admin123)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
