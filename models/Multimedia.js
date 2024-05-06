const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const multimediaSchema = new Schema({
  url: { type: String, required: true },
  mediaType: { type: String, enum: ['photo', 'video'], required: true },
  journalEntry: { type: Schema.Types.ObjectId, ref: 'JournalEntry', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Multimedia', multimediaSchema);