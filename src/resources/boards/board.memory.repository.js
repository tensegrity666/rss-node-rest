const {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../../common/db-boards');

const getAll = async () => await getAllBoards();

const get = async id => {
  const board = await getBoard(id);

  if (board === undefined) throw new Error(`Board with id:${id} not found!`);

  return board;
};

const create = async board => await createBoard(board);
const update = async ({ id, updatedBoard }) =>
  await updateBoard({ id, updatedBoard });
const del = async id => await deleteBoard(id);

module.exports = { getAll, get, create, del, update };
