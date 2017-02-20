var express = require('express');
var app = express();
const cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Todo = require('./models/todo');

const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions))

app.use(bodyParser.json());

//app.use(function (req, res, next) {
//
//    // Website you wish to allow to connect
//    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//
//    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', true);
//
//    // Pass to next layer of middleware
//    next();
//});
////connect to mongoose

mongoose.connect('mongodb://localhost/todo');
var db = mongoose.connection;

app.get('/get/all', function(req, res){
    Todo.getTodoList(function(err, todoList){
        if(err) {
            throw err
        }
        res.json(todoList)
    });
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
