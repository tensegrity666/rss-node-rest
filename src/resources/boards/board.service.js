const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);

const del = id => {
  tasksRepo.resetByBoard(id);
  const result = boardsRepo.del(id);

  return result;
};

const update = ({ id, updatedBoard }) =>
  boardsRepo.update({ id, updatedBoard });

module.exports = { getAll, get, create, del, update };
