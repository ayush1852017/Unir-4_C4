const express = require('express');
const app = express();
const userController = require('./controllers/user.controller');
const todoController = require('./controllers/todo.controller');
app.use(express.json());
app.post("/register",register);
app.post("login",login);
app.use("/user",userController);
app.use("/todos",todoController);

module.exports = app;