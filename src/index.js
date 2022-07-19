import './styles/main.scss';

let to_dos;

(() => {
  loadToDosFromLocalStorage();
  loadToDosIntoTheDOM();
  // TODO: check if there are no to-do`s and if so add a empty to-do
})();

function loadToDosFromLocalStorage() {
  // TODO: load the to-do`s from local storage in to_dos using JSON.parse()
}

function loadToDosIntoTheDOM() {
  // TODO: load to-do`s from to_dos into the dom
}

function saveToDosToLocalStorage() {
  // TODO: save the to_dos variable to local storage with JSON.stringify()
}

function genNewToDoItem() {
  const li = document.createElement('li');
  li.className = 'todo-container__item';

  const checkBtn = document.createElement('input');
  checkBtn.type = 'button';
  checkBtn.className = 'todo-container__item__checked-toggle-btn';
  li.appendChild(checkBtn);

  const textInp = document.createElement('input');
  textInp.type = 'text';
  textInp.className = 'todo-container__item__content';
  textInp.id = 'todo-content'
  li.appendChild(textInp);

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.className = 'todo-container__item__delete-btn';
  li.appendChild(deleteBtn)

  return li;
}

function addToDoToDOM(item) {
  const todoContainer = document.querySelector('#todo-container');
  todoContainer.insertBefore(
    item,
    todoContainer.firstElementChild.nextElementSibling
  );
}

function addToDo(item) {
  addToDoToDOM(item);
  // TODO: add item to to_dos
}

// Listener
// TODO: create new to-do
document.querySelector('#create-todo-btn').addEventListener('click', () => {
  let toDoItem = genNewToDoItem();
  addToDo(toDoItem);
});

// TODO: delete a to-do

// TODO: check if any to-do has changed and if so save them to localStorage

// TODO: toggle check of to-do
