// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const _todo_form = document.querySelector(".js-todo_form");
const _todo_input = _todo_form.querySelector("input");
const _todo_pending = document.querySelector(".js-todo-pending");
const _todo_finished = document.querySelector(".js-todo-finished");

const TODO_PENDING = "todo-pending";
const TODO_FINISHED = "todo-finished";

let _todoPendingObjs = [];
let _todoFinishedObjs = [];

function save_todo_pending() {
  localStorage.setItem(TODO_PENDING, JSON.stringify(_todoPendingObjs));
}
function save_todo_finished() {
  localStorage.setItem(TODO_FINISHED, JSON.stringify(_todoFinishedObjs));
}
function patint_todo_pending(value) {
  const li = document.createElement("li");
  const delete_btn = document.createElement("button");
  const finish_bnt = document.createElement("button");
  const newid = _todoPendingObjs.length + 1;

  delete_btn.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    _todo_pending.removeChild(li);
    _todoPendingObjs = _todoPendingObjs.filter((todo) => {
      return todo.id !== parseInt(li.id, 10);
    });
    save_todo_pending();
  });
  finish_bnt.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    _todo_pending.removeChild(li);
    _todoPendingObjs = _todoPendingObjs.filter((todo) => {
      return todo.id !== parseInt(li.id, 10);
    });
    save_todo_pending();
    const span = li.querySelector("span");
    patint_todo_finished(span.innerText);
  });
  delete_btn.innerText = "❌";
  finish_bnt.innerText = "✅";
  const span = document.createElement("span");
  span.innerText = value;
  li.append(span, delete_btn, finish_bnt);
  li.id = newid;
  _todo_pending.appendChild(li);
  const todoObj = {
    text: value,
    id: newid
  };
  _todoPendingObjs.push(todoObj);
  save_todo_pending();
}
function patint_todo_finished(value) {
  const li = document.createElement("li");
  const delete_btn = document.createElement("button");
  const pending_bnt = document.createElement("button");
  const newid = _todoFinishedObjs.length + 1;

  delete_btn.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    _todo_finished.removeChild(li);
    _todoFinishedObjs = _todoFinishedObjs.filter((todo) => {
      return todo.id !== parseInt(li.id, 10);
    });
    save_todo_finished();
  });
  pending_bnt.addEventListener("click", (event) => {
    const li = event.target.parentNode;
    _todo_finished.removeChild(li);
    _todoFinishedObjs = _todoFinishedObjs.filter((todo) => {
      return todo.id !== parseInt(li.id, 10);
    });
    save_todo_finished();
    const span = li.querySelector("span");
    patint_todo_pending(span.innerText);
  });
  delete_btn.innerText = "❌";
  pending_bnt.innerText = "🅿️";
  const span = document.createElement("span");
  span.innerText = value;
  li.append(span, delete_btn, pending_bnt);
  li.id = newid;
  _todo_finished.appendChild(li);
  const todoObj = {
    text: value,
    id: newid
  };
  _todoFinishedObjs.push(todoObj);
  save_todo_finished();
}
function load_todo_pending() {
  const tmp = localStorage.getItem(TODO_PENDING);
  if (tmp !== null) {
    const parsed_todos = JSON.parse(tmp);
    parsed_todos.forEach(function (todo) {
      patint_todo_pending(todo.text);
    });
  }
}
function load_todo_finished() {
  const tmp = localStorage.getItem(TODO_FINISHED);
  if (tmp !== null) {
    const parsed_todos = JSON.parse(tmp);
    parsed_todos.forEach(function (todo) {
      patint_todo_finished(todo.text);
    });
  }
}
function init() {
  load_todo_pending();
  load_todo_finished();
  _todo_form.addEventListener("submit", (event) => {
    event.preventDefault();
    const currvalue = _todo_input.value;
    patint_todo_pending(currvalue);
    _todo_input.value = "";
  });
}

init();
