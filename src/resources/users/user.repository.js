const User = require('./user.model');

const getAllUsers = () => User.find({});

const getUser = id => User.findById(id);

const createUser = newUser => User.create(newUser);

const deleteUser = id => User.deleteOne({ _id: id });

const updateUser = async ({ id, updatedInfo }) => {
  await User.updateOne({ _id: id }, updatedInfo);
  return getUser(id);
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
