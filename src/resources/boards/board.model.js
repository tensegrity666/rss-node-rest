const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    title: { type: String, required: true },
    columns: { type: Array, optional: true }
  },
  { versionKey: false }
);

module.exports = model('Board', schema);
