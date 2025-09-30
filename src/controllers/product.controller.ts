// src/controllers/product.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, inStock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, inStock },
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create product" });
  }
};
