const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('../../common/db-users');

const getAll = async () => await getAllUsers();

const get = async id => {
  const user = await getUser(id);

  if (user === undefined) throw new Error(`User with id:${id} not found!`);

  return user;
};

const create = async user => await createUser(user);

const del = async id => await deleteUser(id);

const update = async (id, value) => await updateUser(id, value);

module.exports = { getAll, get, create, del, update };
