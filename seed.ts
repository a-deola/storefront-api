import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const shoesCategory = await prisma.category.findFirstOrThrow({
    where: { name: "Shoes" },
  });

  const sneaker = await prisma.product.create({
    data: {
      name: "Sneaker",
      description: "Comfortable sneakers",
      baseImage:
        "https://storefront-pictures.s3.eu-north-1.amazonaws.com/storefront-img/black-sneakers.jpg",
      price: 150.0,
      categoryId: shoesCategory.id, // link to category
    },
  });

  // 3️⃣ Create variants for the product
  await prisma.productVariant.createMany({
    data: [
      {
        color: "black",
        size: "45",
        stock: 10,
        imageUrl:
          "https://storefront-pictures.s3.eu-north-1.amazonaws.com/storefront-img/black-sneakers.jpg",
        productId: sneaker.id,
      },
      {
        color: "red",
        size: "40",
        stock: 5,
        imageUrl:
          "https://storefront-pictures.s3.eu-north-1.amazonaws.com/storefront-img/red-sneakers.jpg",
        productId: sneaker.id,
      },
    ],
  });

  console.log("Seed complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
