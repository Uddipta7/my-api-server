const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET one item
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// POST a new item
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  const savedItem = await newItem.save();
  res.json(savedItem);
});

// PUT (update) an item
router.put('/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
