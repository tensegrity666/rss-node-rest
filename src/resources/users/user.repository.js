const User = require('./user.model');

const getAllUsers = async () => await User.find({});

const getUser = async id => await User.findById(id);

// const createUser = newUser => {
//   DB.users.push(newUser);

//   return getUser(newUser.id);
// };

// const deleteUser = id => {
//   const userIndex = DB.users.findIndex(user => user.id === id);

//   if (userIndex === -1) return false;

//   DB.users = DB.users.filter(user => user.id !== id);

//   return true;
// };

// const updateUser = ({ id, updatedInfo }) => {
//   const userIndex = DB.users.findIndex(user => user.id === id);

//   if (userIndex === -1) return false;

//   DB.users.splice(userIndex, 1, updatedInfo);

//   return getUser(id);
// };

module.exports = { getAllUsers, getUser };
// module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
