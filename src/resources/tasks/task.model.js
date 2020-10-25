const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    columnId: { type: String, required: true },
    userId: { type: String, required: true },
    boardId: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = model('Task', schema);
