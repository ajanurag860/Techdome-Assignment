const Datastore = require('nedb');

const usersDB = new Datastore('./databases/users.db');
const todosDB = new Datastore('./databases/todos.db');

usersDB.loadDatabase();
todosDB.loadDatabase();

module.exports = {
  usersDB,
  todosDB,
};