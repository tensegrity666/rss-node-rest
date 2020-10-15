const User = require('../../resources/users/user.model');

const user1 = new User();
const user2 = new User();
const user3 = new User();
const user4 = new User({ id: '123' });

const usersDB = [user1, user2, user3, user4];

const getAllUsers = () => [...usersDB];

const getUser = id => usersDB.filter(element => element.id === id)[0];

const createUser = user => {
  usersDB.push(user);

  return getUser(user.id);
};

const deleteUser = async id => {
  const userIndex = await usersDB.findIndex(item => item.id === id);

  try {
    if (userIndex !== -1) {
      usersDB.splice(userIndex, 1);

      return true;
    }

    return false;
  } catch (error) {
    throw new Error(`Error occured while deleting user ${id}`);
  }
};

const updateUser = async props => {
  const { id, updatedUser } = props;

  const userIndex = await usersDB.findIndex(item => item.id === id);

  try {
    usersDB.splice(userIndex, 1, updatedUser);

    return getUser(id);
  } catch (error) {
    throw new Error(`Error occured while updating user ${id}`);
  }
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
