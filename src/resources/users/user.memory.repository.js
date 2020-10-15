const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../common/db/db-users');

const getAll = async () => await getAllUsers();

const get = async id => {
  const user = await getUser(id);

  if (user === undefined) throw new Error(`User with id:${id} not found!`);

  return user;
};

const create = async user => await createUser(user);
const update = async (id, value) => await updateUser(id, value);
const del = async id => await deleteUser(id);

module.exports = { getAll, get, create, del, update };
