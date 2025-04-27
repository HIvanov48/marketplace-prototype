import express from "express";
import Product from "../models/Product.js";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/data", async (req, res) => {
  const { q, category } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q };
  if (category) filter.category = category;
  const products = await Product.find(filter);
  res.json(products);
});

router.post("/", async (req, res) => {
  const {
    name,
    description,
    category,
    variantName,
    variantPrice,
    variantStock,
  } = req.body;
  const variants = [
    {
      name: variantName,
      price: Number(variantPrice),
      stock: Number(variantStock),
    },
  ];
  await Product.create({ name, description, category, variants });
  res.redirect("/");
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

router.get("/edit/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send("Product not found");

  res.sendFile(path.join(__dirname, "../views/edit.html"));
});

router.get("/data/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post("/edit/:id", async (req, res) => {
  const {
    name,
    description,
    category,
    variantName,
    variantPrice,
    variantStock,
  } = req.body;
  const variants = [
    {
      name: variantName,
      price: Number(variantPrice),
      stock: Number(variantStock),
    },
  ];
  await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    category,
    variants,
  });
  res.redirect("/");
});

export default router;
