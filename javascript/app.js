({
  plugins: ["jsdom-quokka-plugin"],
  jsdom: { file: "./index.html" },
});

//! SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//! EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getLocalTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//! FUNCTIONS
function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.length > 0) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-element");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("todo-complete");

    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("todo-trash");

    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function deleteTodo(event) {
  const item = event.target;

  if (item.classList[0] === "todo-trash") {
    const todo = item.parentElement;
    todo.classList.add("deleted");
    deleteLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "todo-complete") {
    const todo = item.parentElement;
    todo.classList.toggle(`completed`);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }

  todos.push(todo);
  localStorage.setItem(`todos`, JSON.stringify(todos));
}

function getLocalTodo() {
  let todos;

  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-element");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("todo-complete");

    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("todo-trash");

    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function deleteLocalTodo(todo) {
  let todos;

  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem(`todos`, JSON.stringify(todos));
}
