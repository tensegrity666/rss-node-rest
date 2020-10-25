const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    order: { type: Number, required: false },
    columnId: { type: String, required: false },
    userId: { type: String, required: false },
    boardId: { type: String, required: false }
  },
  { versionKey: false }
);

module.exports = model('Task', schema);
