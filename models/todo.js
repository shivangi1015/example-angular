var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    date: String,
    title: String,
    description: String,
    priority: String
});

var Todo = module.exports = mongoose.model('todo', todoSchema, 'todo');

module.exports.getTodoList = function(callback){
    Todo.find(callback)
};

module.exports.removeById = function(id, callback){
    Todo.findByIdAndRemove(id, callback)
};

module.exports.addTodo = function(todo, callback){
    Todo.create(todo, callback)
};

module.exports.updateById = function(id, obj, callback){
    //Todo.create(id, todo, callback)
    Todo.update({_id: id}, obj);
};