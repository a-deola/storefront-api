# Storefront API

A simple RESTful API for managing products and categories, built with **Node.js**, **TypeScript**, and **Prisma ORM** connected to a PostgreSQL database.  

---

## Tech Stack

- **Node.js** →  A fast, lightweight JavaScript runtime built on Chrome’s V8 engine, designed for building scalable and efficient server-side applications. Its non-blocking, event-driven architecture makes it ideal for APIs and real-time services. Backed by a rich npm ecosystem, Node.js empowers developers to build modern applications quickly and reliably. 
- **TypeScript** → A strongly typed superset of JavaScript that adds static typing and powerful tooling to the language. It helps catch errors at compile time, improves code readability, and makes large-scale applications more maintainable. With TypeScript, developers can write cleaner, safer, and more predictable JavaScript for both frontend and backend projects.
- **Prisma ORM** → A modern database toolkit that simplifies database access with an auto-generated, type-safe query builder for Node.js and TypeScript. It streamlines working with relational databases by handling migrations, queries, and data modeling with ease. Prisma improves developer productivity while ensuring safer and more maintainable database interactions.

---

## Getting Started  

### Clone and install dependencies
```bash
git clone https://github.com/a-deola/storefront-api.git
cd storefront-api
npm install
```


### Set up environment variables

Create a .env file in the root:
```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
PORT=5000
```

### Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

### Start the development server
```bash
npm run dev
# The server will start on http://localhost:3000.
```

## API Endpoints

###  Get Products  

**Method:** `GET`  
**Endpoint:** `/products`  

**Query Params:**  
- `category` *(optional, string)* – filter by category name  

**Example Request (curl):**  
```bash
curl "http://localhost:3000/products?category=Clothing"
```

**Path Params:**  
- `id` *(number, required)* – the unique identifier of the product  

**Example Request (curl):**  
```bash
curl http://localhost:5000/products/1
```

**Response Type:** `application/json`

**Example Response:**  
```json
[{
  "success": true,
  "data": [
    {
      "id":1,
      "name": "Denim Jacket",
      "description": "Stylish blue denim jacket with a relaxed fit.",
      "baseImage": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "price": 49.99,
      "category": { "id":1,"name": "Clothing" },
      "variants": [
        {
          "id":1,
          "color": "Blue",
          "size": "M",
          "stock": 15,
          "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
        }
      ]
    }
  ]
}, 
.......
]
```  

---

### Create a Product  

**Method:** `POST`  
**Endpoint:** `/products`  
**Body Params (JSON):**  
- `name` *(string, required)*  
- `description` *(string, optional)*  
-  `baseImage` *(string, required)*
- `price` *(number, required)*  
- `categoryId` *(number, required)*  
- `variants` *(array of objects, optional)*  

**Example Input**
```json
{
  "name": "Running Sneakers",
  "description": "Lightweight sneakers perfect for running and casual wear.",
  "baseImage": "https://storefront-api-u9x3.onrender.com/api/products"
  "price": 79.99,
  "categoryId": 2,
  "variants": [
    {
      "color": "White",
      "size": "42",
      "stock": 10,
      "imageUrl": "https://images.unsplash.com/photo-1528701800489-20be9c6e93b6"
    }
  ]
}
```


Notes

Ensure your database is running before starting the server.

You can test endpoints easily using Postman or curl.