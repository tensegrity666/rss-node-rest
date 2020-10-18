const User = require('../../resources/users/user.model');

const user1 = new User();
const user2 = new User();
const user3 = new User();
const user4 = new User({ id: '123' });

let usersDB = [user1, user2, user3, user4];

const getAllUsers = () => [...usersDB];

const getUser = id => usersDB.filter(element => element.id === id)[0];

const createUser = user => {
  usersDB.push(user);

  return getUser(user.id);
};

const deleteUser = id => {
  const userIndex = usersDB.findIndex(item => item.id === id);

  if (userIndex === -1) return false;

  usersDB = usersDB.filter(user => user.id !== id);
  return true;
};

const updateUser = ({ id, updatedInfo }) => {
  const userIndex = usersDB.findIndex(item => item.id === id);

  if (userIndex === -1) return false;

  usersDB.splice(userIndex, 1, updatedInfo);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
