const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCounter() {
    const remainingTasks = tasks.filter(function (task) {
        return task.completed === false;
    }).length;

    taskCounter.textContent = `Tasks Remaining: ${remainingTasks}`;
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateTaskCounter();
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();