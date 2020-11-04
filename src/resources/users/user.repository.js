const User = require('./user.model');

const getAllUsers = () => User.find({});

const getUser = (id) => User.findById(id);

const getUserByProps = (props) => User.findOne(props);

const deleteUser = (id) => User.deleteOne({ _id: id });

const createUser = (newUser) => User.create(newUser);

const updateUser = async ({ id, processedInfo }) => {
  await User.updateOne({ _id: id }, processedInfo);
  return getUser(id);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserByProps
};
