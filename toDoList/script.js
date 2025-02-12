// Get references to elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const headingColorChanger = document.getElementById('heading-color-changer');
const mainHeading = document.getElementById('main-heading');
const filterActiveBtn = document.getElementById('filter-active-btn');
const toggleListBtn = document.getElementById('toggle-list-btn');

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTaskItem = document.createElement('li');
    const textNode = document.createElement('span');
    textNode.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏ Edit';
    editBtn.classList.add('edit-btn', 'task-btn');
    editBtn.addEventListener('click', () => editTask(newTaskItem, textNode));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌ Delete';
    deleteBtn.classList.add('delete-btn', 'task-btn');
    deleteBtn.addEventListener('click', () => deleteTask(newTaskItem));

    newTaskItem.appendChild(textNode);
    newTaskItem.appendChild(editBtn);
    newTaskItem.appendChild(deleteBtn);
    taskList.appendChild(newTaskItem);

    taskInput.value = "";
}

// Edit Task
function editTask(taskItem, textNode) {
    const newText = prompt("Edit your task:", textNode.textContent);
    if (newText !== null && newText.trim() !== "") {
        textNode.textContent = newText.trim();
    }
}

// Delete Task
function deleteTask(taskItem) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskItem.remove();
        alert('Task deleted successfully!');
    }
}

// Toggle Completed Task
function toggleComplete(event) {
    if (event.target.tagName === 'SPAN') {
        event.target.parentElement.classList.toggle('completed');
    }
}

taskList.addEventListener('click', toggleComplete);

// Change Heading Color
function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}
function changeHeadingColor(){
    mainHeading.style.color = getRandomColor();
}
headingColorChanger.addEventListener('click', changeHeadingColor);

// Filter Tasks on Key Up
filterActiveBtn.addEventListener('keyup', (event) => {
    const filterText = event.target.value.toLowerCase();
    document.querySelectorAll('#task-list li').forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(filterText)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
});

// Show/Hide Task List
toggleListBtn.addEventListener('click', () => {
    taskList.classList.toggle('hidden');
});

// Add event listener to Add Task button
addTaskBtn.addEventListener('click', addTask);
