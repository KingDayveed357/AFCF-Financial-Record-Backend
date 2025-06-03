const express = require('express');
const router = express.Router();
const {
  createRecord,
  getRecords,
  deleteRecord,
} = require('../controllers/recordController');

router.post('/', createRecord);
router.get('/', getRecords);
router.delete('/:id', deleteRecord);

module.exports = router;
