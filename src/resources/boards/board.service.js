const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const del = id => boardsRepo.del(id);
const update = (id, value) => boardsRepo.update(id, value);

module.exports = { getAll, get, create, del, update };
