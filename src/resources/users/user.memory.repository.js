const User = require('./user.model');
const usersArray = [
  {
    id: '1',
    name: 'Anastasiya',
    login: 'apopova',
    password: '123456789'
  },
  {
    id: '2',
    name: 'Vadim',
    login: 'yoihito',
    password: '1234'
  }
];

const getAll = async () => {
  return usersArray;
};

const getUser = async id => {
  return usersArray.find(user => user.id === id);
};

const createUser = async objDetails => {
  const { name, login, password } = objDetails;
  const newUser = new User({ name, login, password });
  usersArray.push(newUser);
  return newUser;
};

const updateUser = async (id, newInfo) => {
  const currentUser = usersArray.find(item => item.id === id);
  if (currentUser) {
    Object.assign(currentUser, newInfo);
    return currentUser;
  }
  return null;
};

const deleteUser = async id => {
  const index = usersArray.findIndex(user => user.id === id);
  if (index !== -1) {
    usersArray.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
