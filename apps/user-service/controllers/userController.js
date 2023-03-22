const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

exports.getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
};

exports.updateUser = async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.userId, req.body);
  if (!updatedUser) {
    res.status(404).send('User not found');
  } else {
    res.json(updatedUser);
  }
};

exports.deleteUser = async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.userId);
  if (!deletedUser) {
    res.status(404).send('User not found');
  } else {
    res.sendStatus(204);
  }
};
