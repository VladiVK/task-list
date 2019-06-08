const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
}



function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((tasksElem) => {
        let li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(tasksElem));

        let link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
        taskList.value = '';
    });
}

function addTask(e) {
    if (taskList.value === '') {
        alert('Please, add new Task');
    }

    let li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    let link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    addTaskToLocalStorage(taskInput.value);

    taskInput.value = '';
    e.preventDefault();
}

function addTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks = tasks.filter( el => el != task.textContent);
    
   

    localStorage.setItem('tasks', JSON.stringify(tasks));
}