import './styles/main.scss';

(() => {
  cleanTodoContainer();
  if (todosExistInLocalStorage()) {
    insertLocalStorageTodosInDOM();
  } else {
    insertTodoInDOM(genTodo());
  }
})();

function cleanTodoContainer() {
  // TODO: remove all todos
}
function todosExistInLocalStorage() {
  // TODO: check if todos exist in local storage
}

function insertLocalStorageTodosInDOM() {
  // TODO: insert the local storage todos into the DOM
}

function saveDOMTodosInLocalStorage() {
  let children = document.querySelector('#todo-container').children;
  let childrenForLocalStorage = [];
  for (let i = 1; i < children.length; i++) {
    let isFinished = children[i].classList.contains('finished');
    let text = children[i].firstChild.nextSibling.value;
    childrenForLocalStorage.push({ isFinished: isFinished, text: text });
  }
  localStorage.setItem('todos', JSON.stringify(childrenForLocalStorage));
}

function genTodo(text = '', isFinished = false) {
  const li = document.createElement('li');
  li.className = 'todo-container__item';

  const checkBtn = document.createElement('input');
  checkBtn.type = 'button';
  checkBtn.className =
    'todo-container__item__checked-toggle-btn checked-toggle-btn';
  if (isFinished) checkBtn.classList.add('finished');
  checkBtn.addEventListener('click', () => {
    if (!checkBtn.parentElement.classList.contains('finished')) {
      checkBtn.parentElement.classList.add('finished');
    } else {
      checkBtn.parentElement.classList.remove('finished');
    }
    saveDOMTodosInLocalStorage();
  });
  li.appendChild(checkBtn);

  const textInp = document.createElement('input');
  textInp.type = 'text';
  textInp.className = 'todo-container__item__content todo-content';
  textInp.value = text;
  textInp.addEventListener('change', () => {
    saveDOMTodosInLocalStorage();
  });
  li.appendChild(textInp);

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.className = 'todo-container__item__delete-btn delete-btn';
  deleteBtn.addEventListener('click', () => {
    deleteBtn.parentElement.remove();
    saveDOMTodosInLocalStorage();
  });
  li.appendChild(deleteBtn);

  return li;
}

function insertTodoInDOM(item) {
  const todoContainer = document.querySelector('#todo-container');
  const secondSibling = todoContainer.firstElementChild.nextElementSibling;
  todoContainer.insertBefore(item, secondSibling);
  saveDOMTodosInLocalStorage();
}

// function addToDo(item) {
//   addToDoToDOM(item);
//   // TODO: add item to to_dos
// }

// Listener
document.querySelector('#create-todo-btn').addEventListener('click', () => {
  insertTodoInDOM(genTodo());
});

document.querySelectorAll('.delete-btn').forEach((e) => {
  e.addEventListener('click', () => {
    e.parentElement.remove();
  });
});

// TODO: check if any to-do has changed and if so save them to localStorage

document.querySelectorAll('.checked-toggle-btn').forEach((e) => {
  e.addEventListener('click', () => {
    if (!e.parentElement.classList.contains('finished')) {
      e.parentElement.classList.add('finished');
    } else {
      e.parentElement.classList.remove('finished');
    }
  });
});
