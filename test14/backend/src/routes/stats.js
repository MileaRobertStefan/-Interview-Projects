const express = require('express');
const router = express.Router();

const statsService = require('../services/statsService');

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
    const stats = statsService.getStats();

    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;