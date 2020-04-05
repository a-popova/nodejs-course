const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title, order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [{ title: 'title', order: '1' }]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [];
    for (const column of columns) {
      this.columns.push(new Column(column));
    }
  }
}

module.exports = Board;
