const users = [
    { id: '1', username: 'John Doe' },
    { id: '2', username: 'Ben Dover' },
    { id: '3', username: 'Joe Mama' }
  ];
  
  exports.getAllUsers = async () => {
    return users;
  };
  
  exports.getUserById = async (id) => {
    return users.find((user) => user.id === id);
  };
  
  exports.createUser = async (userData) => {
    const user = { id: (users.length + 1).toString(), ...userData };
    users.push(user);
    return user;
  };
  
  exports.updateUser = async (id, userData) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...userData };
    return users[index];
  };
  
  exports.deleteUser = async (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const deletedUser = users.splice(index, 1)[0];
    return deletedUser;
  };
  