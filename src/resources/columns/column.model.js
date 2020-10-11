const uuid = require('uuid');

class Column {
  constructor({ title = 'Default column', order = null, tasks = [] } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.tasks = tasks;
  }
}

module.exports = Column;
