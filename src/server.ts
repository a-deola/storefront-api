import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import router from "./routes/product.routes.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://storefront-eight-zeta.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} 🚀`);
});
