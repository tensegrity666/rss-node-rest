const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../common/db/db-users');

const getAll = async () => await getAllUsers();
const get = async id => await getUser(id);
const create = async userInfo => await createUser(userInfo);
const update = async ({ id, updatedInfo }) =>
  await updateUser({ id, updatedInfo });
const del = async id => await deleteUser(id);

module.exports = { getAll, get, create, del, update };
