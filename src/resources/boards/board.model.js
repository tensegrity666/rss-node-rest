const uuid = require('uuid');

class Board {
  constructor({
    title = 'Default board',
    tasks = [],
    columns = [
      {
        title: 'string',
        order: 0
      }
    ]
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.tasks = tasks;
    this.columns = columns;
  }
}

module.exports = Board;
