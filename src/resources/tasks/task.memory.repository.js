const { getTask } = require('../../common/db-tasks');

const get = async id => {
  const task = await getTask(id);

  if (task === undefined) throw new Error(`User with id:${id} not found!`);

  return task;
};

// const create = async user => await createUser(user);

// const del = async id => await deleteUser(id);

// const update = async (id, value) => await updateUser(id, value);

module.exports = { get };
