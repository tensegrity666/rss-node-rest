const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Default task',
    description = 'Default description',
    order = null,
    columnId = null,
    userId = null,
    boardId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.columnId = columnId;
    this.userId = userId;
    this.boardId = boardId;
  }
}

module.exports = Task;
