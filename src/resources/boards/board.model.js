const uuid = require('uuid');

class Board {
  constructor({ title = 'Default board', columns = [] } = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
