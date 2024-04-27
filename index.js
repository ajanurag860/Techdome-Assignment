// import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// import controllers
const authController = require('./controllers/auth.controller');
const todoController = require('./controllers/todo.controller');

// import middleware
const { authenticateToken } = require('./middleware/auth.middleware');

app.use(cors());
app.use(bodyParser.json());

// add controller functions
app.use('/auth', authController);
app.use('/api/todos', authenticateToken, todoController);

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });