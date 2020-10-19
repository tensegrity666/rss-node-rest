const DB = require('../../common/db');

const getAllUsers = () => [...DB.users];

const getUser = id => DB.users.filter(user => user.id === id)[0];

const createUser = user => {
  DB.users.push(user);

  return getUser(user.id);
};

const deleteUser = id => {
  const userIndex = DB.users.findIndex(user => user.id === id);

  if (userIndex === -1) return false;

  DB.users = DB.users.filter(user => user.id !== id);

  return true;
};

const updateUser = ({ id, updatedInfo }) => {
  const userIndex = DB.users.findIndex(user => user.id === id);

  if (userIndex === -1) return false;

  DB.users.splice(userIndex, 1, updatedInfo);

  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
