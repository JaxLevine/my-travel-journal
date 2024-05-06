const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalEntrySchema = new Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
  multimedia: [{ type: Schema.Types.ObjectId, ref: 'Multimedia' }]
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);