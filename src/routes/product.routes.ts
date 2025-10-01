import { Router } from "express";
import { getProducts, getProductById, createProduct } from "../controllers/product.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);

export default router;



