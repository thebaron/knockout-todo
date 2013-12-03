function LocalStorageVault(key) {
  this.read = function () {
    var storedTodos = JSON.parse(localStorage.getItem(key)) || [];
    return storedTodos.map(function (todo) {
      return new Todo(todo);
    });
  }
  this.write = function (array) {
    var string = JSON.stringify(array.map(function (todo) {
      return todo.todoText();
    }));
    localStorage.setItem(key, string);
  }
}

function Todo(text) {
  this.todoText = ko.observable(text);
  this.editing = ko.observable(!text.length);
  this.edit = function () {
    this.editing(true);
  }
  this.done = function () {
    this.editing(false);
  }
}

function TodoList(storage) {
  var _this = this;
  this.todos = ko.observableArray(storage.read());
  this.save = function () {
    storage.write(this.todos());
  };
  this.clear = function () {
    this.todos.removeAll();
  };
  this.add = function () {
    this.todos.push(new Todo(""));
  };
  this.remove = function (todoToRemove) {
    _this.todos.remove(todoToRemove);
  };
}
var viewModel = new TodoList(new LocalStorageVault('mytodos'));
ko.applyBindings(viewModel);
