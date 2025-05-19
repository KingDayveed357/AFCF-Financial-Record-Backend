
const moment = require('moment-timezone'); 
const Record = require('../models/Record');

// @desc    Create a new record
exports.createRecord = async (req, res, next) => {
  try {
    let { title, amount, category, date } = req.body;

    let parsedDate = undefined;
    if (date) {
      const formattedDate = moment.tz(date, 'DD/MM/YYYY', 'Africa/Lagos'); // Keep this as a moment object

      if (!formattedDate.isValid()) {
        return res.status(400).json({ error: 'Invalid date format. Use DD/MM/YYYY.' });
      }

      parsedDate = formattedDate.toDate(); // Only call .toDate() after validation
    }

    const record = new Record({
      title,
      amount,
      category,
      date: parsedDate,
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};
// @desc    Get all records
exports.getRecords = async (req, res, next) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete record by ID
exports.deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    next(err);
  }
};
