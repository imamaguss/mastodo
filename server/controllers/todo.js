const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class Controller {
  static create(req, res) {
    const token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      let newTodo = new Todo({
        userId: decoded.id,
        name: req.body.name,
        description: req.body.description,
        status: 0,
        dueDate: new Date(req.body.dueDate)
      });

      newTodo
        .save()
        .then(todo => {
          
          res.status(200).json({
            message: `${todo.name} has been added`
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err
          })
        });
    })
  }

  static findAll(req, res) {
    const token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      // console.log(decoded.id);
      Todo
        .find({userId: decoded.id})
        .then(todos => {
          console.log(todos);
          res.status(200).json({todos})
        })
        .catch(err => {
          console.log(err);
          
        })
    })
    
  }

  static submitUpdate(req, res) {
    console.log(req.body);
    
    let id = req.params.id
    const condition = {_id: id};
    Todo
      .where(condition)
      .update({
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate
      })
      .then(todoUpdated => {
        res.status(200).json({
          message: `Your activity has been updated`
        })
      })
      .catch(err => {
        res.status(500).json({message: err})
      })
  }

  static removeTodo(req, res) {
    Todo
      .deleteOne({_id: req.params.id})
      .then(removed => {
        res.status(201).json({
          message: `Your activity has been removed`
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }

}

module.exports = Controller;