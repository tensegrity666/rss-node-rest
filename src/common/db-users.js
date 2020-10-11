const User = require('../resources/users/user.model');

const user1 = new User();
const user2 = new User();
const user3 = new User();
const user4 = { id: '123', name: 'Vasya' };

let usersDB = [user1, user2, user3, user4];

const getAllUsers = () => [...usersDB];

const getUser = id => usersDB.filter(element => element.id === id)[0];

const createUser = user => {
  usersDB.push(user);

  return getUser(user.id);
};

const deleteUser = id => {
  const user = getUser(id);
  const index = usersDB.indexOf(user);
  const usersBefore = usersDB.slice(0, index);
  const usersAfter = usersDB.slice(index + 1);
  usersDB = [...usersBefore, ...usersAfter];

  return usersDB;
};

const updateUser = (id, value) => {
  const user = getUser(id);
  const index = usersDB.indexOf(user);

  return (usersDB[index] = { id, user, ...value });
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
