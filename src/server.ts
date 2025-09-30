import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API is running");
});
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, description, price, inStock } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, inStock },
  });
  res.json(product);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} 🚀`);
});
