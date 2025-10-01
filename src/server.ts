import express from "express";
import { PrismaClient } from "@prisma/client";
import router from "./routes/product.routes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} 🚀`);
});
