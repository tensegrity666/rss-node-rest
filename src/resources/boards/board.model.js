const { Schema, model } = require('mongoose');

const Column = new Schema(
  {
    title: { type: String },
    order: { type: Number }
  },
  { versionKey: false }
);

const schema = new Schema(
  {
    title: { type: String, required: true },
    columns: [Column]
  },
  { versionKey: false }
);

module.exports = model('Board', schema);
