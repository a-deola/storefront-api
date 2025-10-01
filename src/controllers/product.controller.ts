import { Request, Response } from "express";
import prisma from "../prisma";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const products = await prisma.product.findMany({
      where: category ? { category: { name: String(category) } } : {},
      include: { variants: true, category: true },
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};


export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { variants: true, category: true },
    });

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId, variants } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, error: "Name and price are required" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId, 
        variants: {
          create: variants?.map((v: any) => ({
            color: v.color,
            size: v.size,
            stock: v.stock || 0,
            imageUrl: v.imageUrl,
          })),
        },
      },
      include: { variants: true, category: true },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create product" });
  }
};
