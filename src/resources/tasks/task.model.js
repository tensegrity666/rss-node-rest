const uuid = require('uuid');

class Task {
  constructor({
    title = 'Default task',
    description = 'Default description',
    columnId = null,
    order = null,
    userId = null,
    boardId = null
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.order = order;
    this.columnId = columnId;
    this.userId = userId;
    this.boardId = boardId;
  }
}

module.exports = Task;
