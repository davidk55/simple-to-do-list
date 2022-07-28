import './styles/main.scss';

(() => {
  if (todosExistInLocalStorage()) {
    insertLocalStorageTodosInDOM();
  } else {
    insertTodoInDOM(genTodo());
  }
  addDragEventLister();
})();

function addDragEventLister() {
  const todoContainer = document.querySelector('#todo-container');

  todoContainer.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragging');
  });

  todoContainer.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });

  todoContainer.addEventListener('dragover', (e) => {
    e.preventDefault();

    const dragging = document.querySelector('.dragging');
    if (!dragging) return;

    const closestTodo = getClosestBottomTodo(todoContainer, e.clientY);

    if (closestTodo == null) todoContainer.appendChild(dragging);
    else todoContainer.insertBefore(dragging, closestTodo);
    saveDOMTodosInLocalStorage();
  });
}

function getClosestBottomTodo(todoContainer, y) {
  const draggableTodos = [
    ...todoContainer.querySelectorAll('.todo-container__item:not(.dragging)'),
  ];

  return draggableTodos.reduce(
    (closest, curTodo) => {
      const rect = curTodo.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - y;
      if (offset > 0 && offset < closest.offset) {
        return { offset: offset, todo: curTodo };
      } else return closest;
    },
    { offset: Number.MAX_SAFE_INTEGER }
  ).todo;
}

function todosExistInLocalStorage() {
  if (localStorage.getItem('todos')) return true;
  return false;
}

function insertLocalStorageTodosInDOM() {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos
    .slice()
    .reverse()
    .forEach((e) => {
      insertTodoInDOM(genTodo(e.text, e.isFinished));
    });
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

  li.setAttribute('draggable', 'true');
  li.setAttribute('drop', 'true');

  const checkBtn = document.createElement('input');
  checkBtn.type = 'button';
  checkBtn.className =
    'todo-container__item__checked-toggle-btn checked-toggle-btn';
  if (isFinished) li.classList.add('finished');
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

// Listener
document.querySelector('#create-todo-btn').addEventListener('click', () => {
  insertTodoInDOM(genTodo());
});
