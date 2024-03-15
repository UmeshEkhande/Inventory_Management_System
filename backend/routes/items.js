const express = require("express");
const router = express.Router();
const Item = require("../models/items");

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

router.patch("/:id", getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.description != null) {
    res.item.description = req.body.description;
  }
  if (req.body.quantity != null) {
    res.item.quantity = req.body.quantity;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Cannot find item" });
    }
    res.item = item;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

router.delete("/:id", getItem, async (req, res) => {
  try {
    const itemToDelete = res.item;
    await Item.deleteOne({ _id: itemToDelete._id });
    res.json({ message: "Deleted Item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
