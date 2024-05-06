// journalEntries.js (server-side)
const JournalEntry = require('../../models/journalEntry');
const User = require('../../models/user');

async function getByUser(req, res) {
  try {
    const journalEntries = await JournalEntry.find({ user: req.params.userId })
      .populate('user', 'name');
    res.json(journalEntries);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  delete: deleteEntry,
  getByUser
};

async function create(req, res) {
  try {
    const journalEntry = await JournalEntry.create({
      ...req.body,
      user: req.user._id
    });
    res.json(journalEntry);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const journalEntries = await JournalEntry.find()
      .populate('user', 'name');

    res.json(journalEntries);
  } catch (err) {
    res.status(500).json(err);
  }
}


async function show(req, res) {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id)
      .populate('user', 'name');
    if (!journalEntry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.json(journalEntry);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function update(req, res) {
  try {
    const updatedEntry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteEntry(req, res) {
  try {
    const deletedEntry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
}