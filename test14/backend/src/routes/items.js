const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');
const { filter, paginate } = require('../utils/query');

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const data = await dataService.data;
    const { q, skip, take } = req.query;
    let results = data;

    results = filter(results, q);
    results = paginate(results, parseInt(skip) || 0, parseInt(take) || 50);

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', (req, res, next) => {
  try {
    const item = dataService.findById(parseInt(req.params.id));

    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', (req, res, next) => {
  try {
    const item = req.body;
    dataService.addItem(item);

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;