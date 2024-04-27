// import necessary modules
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { todosDB, usersDB } = require('./db');
const { authenticateToken } = require('../middleware/auth.middleware');

// create new todo
router.post('/api/todos', authenticateToken, (req, res) => {

    // open request body
    const { title, completed } = req.body;

    // add todo to object for jsonification
    const newTodo = {
        tid: uuidv4(),
        title: title,
        completed: completed,
        uId: req.user.id,
    };

    // add to todo database
    todosDB.insert(newTodo);
    res.json(newTodo);
});

// Get a todo
router.get('/api/todos/:id', authenticateToken, (req, res) => {
    const todo = todosDB.find(todo => todo.tid === req.params.id);
    if (!todo) {
        return res.status(404).send('Error: Todo not found');
    }
    if (req.user.role !== 'admin' && todo.uId !== req.user.id) {
        return res.status(401).send('Error: Unauthorized access attempt');
    }
    res.json(todo);
});

// update a todo
router.put('/api/todos/:id', authenticateToken, async (req, res) => {

    // opening request
    const { role, id } = await req.user
    const { title, completed } = await req.body

    // find the todo
    const todo = todosDB.find(todo => todo.id === req.params.id);

    // error condition: no todo found
    if (!todo) {
        return res.status(404).send('Error: Todo not found');
    }

    // error condition: insufficient access
    if (role !== 'admin' && todo.userId !== id) {
        return res.status(401).send('Error: Unauthorized access attempt');
    }
    todo.title = title;
    todo.completed = completed;
    res.json(todo);
});
  
// delete a todo
router.delete('/api/todos/:id', authenticateToken, async (req, res) => {

    // opening request
    const { role, id } = await req.user

    // error condition: no such todo
    const todoIndex = todosDB.findIndex(todo => todo.id === req.params.id);
    if (todoIndex === -1) {
        return res.status(404).send('Error: Todo not found');
    }

    // error condition: insufficient access
    if (role !== 'admin' && todosDB[todoIndex].userId !== id) {
        return res.status(401).send('Error: Unauthorized access attempt');
    }

    todosDB.splice(todoIndex, 1);
    res.status(204).send();
});

// helper function to find user by id
// function findUserById(uid) {
//     return new Promise((resolve, reject) => {
//         usersDB.findOne(
//         {
//             uid: uid,
//         },
//         (err, user) => {
//             if (err) {
//             reject(err)
//             }
//             resolve(user)
//         }
//         )
//     })
// }

module.exports = router;