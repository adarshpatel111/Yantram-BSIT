// pages/api/products/index.ts
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: "Failed to create product" });
    }
  }

  res.status(405).end(); // Method Not Allowed
}
