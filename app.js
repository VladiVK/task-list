// определяем переменный
const form = document.querySelector("#task-form"),
  taskList = document.querySelector(".collection"),
  clearBtn = document.querySelector(".clear-tasks"),
  filter = document.querySelector("#filter"),
  taskInput = document.querySelector("#task");

// загрузим все event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // событие: кнопка Add Task
  form.addEventListener("submit", addTask);
  // удаляем li из ul class="collection" по нажатию крестика
  // то есть из taskList удаляем текущий task
  taskList.addEventListener("click", removeTask);
  // очистим все таски кнопкой CLear Tasks
  clearBtn.addEventListener("click", clearTasks);

  // подключим filter
  filter.addEventListener("keyup", filterTasks);
}

// get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // создаем элемент li
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // создаем текстовый узел и добавляем в li
    li.appendChild(document.createTextNode(task)); // здесь task, а не taskInput.value (см. ниже)
    // создаем новую ссылку(link)
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // создаем иконку
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // добавляем link в li
    li.appendChild(link);
    // добавляем li в ul ( у нас он taskList )
    taskList.appendChild(li);
  });
}

// добавляем событие
function addTask(e) {
  if (taskInput.value === "") {
    alert("add task");
  }

  // создаем элемент li
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // создаем текстовый узел и добавляем в li
  li.appendChild(document.createTextNode(taskInput.value));
  // создаем новую ссылку(link)
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // создаем иконку
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // добавляем link в li
  li.appendChild(link);

  // добавляем li в ul ( у нас он taskList )
  taskList.appendChild(li);

  // добавим все в Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // и очищаем поле инпут taskInput
  taskInput.value = "";

  e.preventDefault();
}
// store Task in Local Storage

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
// нам надо кликнуть только на крестик: <i class="fa fa-remove"></i>
// поэтому спросим если у родителя крестика есть класс delete-item, то действуем...
// удалим родителя родителя то есть li - конкретный task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      // Remove from DOM
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  // мой вариант
  // tasks = tasks.filter( el => taskItem.textContent != el );

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear all tasks

function clearTasks() {
  // самый простой, но не самый быстрый вариант
  /* taskList.innerHTML = ''; */

  // быстрее вариант
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // мой вариант
  /* [... taskList.children].forEach( el => el.remove() );*/

  // Clear all Tasks from Local Storage
  clearTasksFromLocalStorage();
}

// Clear all Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// use Filter

function filterTasks(e) {
  // берем в переменную то, что ввели в filter
  const text = e.target.value.toLowerCase();

  // возьмем все наши li (все task)  у них класс collection-item
  document.querySelectorAll(".collection-item").forEach(function (task) {
    // task это li
    // item это его содержимое в строке
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}