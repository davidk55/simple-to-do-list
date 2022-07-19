import './styles/main.scss';

let to_dos

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
  // TODO: create new to-do item using document fragment
}

function addToDoToDOM(item) {
  // TODO: add the item to the DOM
}

function addToDo(id) {
  const item = document.querySelector(id);
  addToDoToDOM(item)
  // TODO: add item to to_dos
}

// Listener
// TODO: create new to-do

// TODO: delete a to-do

// TODO: check if any to-do has changed and if so save them to localStorage

// TODO: toggle check of to-do
