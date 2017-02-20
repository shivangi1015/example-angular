var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Todo = require('./models/todo');

app.use(bodyParser.json());

//connect to mongoose

mongoose.connect('mongodb://localhost/todo');
var db = mongoose.connection;

app.get('/get/all', function(req, res){
    Todo.getTodoList(function(err, todoList){
        if(err) {
            throw err
        }
        res.json(todoList)
    })
});

app.get('/remove/:id', function(req, res){
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Todo.removeById(req.params.id, function(err, todo){
        if(err) {
            throw err
        }
        res.json(todo)
    })
    } else {
        res.send({'message':'Invalid ID'})
    }
});

app.post('/add', function(req, res){

    console.log(req.body)

    if(req.body.title && req.body.description && req.body.priority) {
        var body = req.body;
        Todo.addTodo(body, function(err, todo){
            if(err) {
                throw err
            }
            res.json(todo)
        })
    } else {
        res.send({'message':'Invalid data'})
    }
});

app.post('/update', function(req, res){

    console.log(req.body)

    if(req.body.title && req.body.description && req.body.priority && req.body._id ) {
        var obj = {
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority
        };
        Todo.updateById(req.body._id, obj, function(err, todo){
            if(err) {
                throw err
            }
            res.json(todo)
        })
    } else {
        res.send({'message':'Invalid data'})
    }
});


app.listen(9000);
console.log('running on port 9K')
