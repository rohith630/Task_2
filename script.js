const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.description;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "completed";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveAndRender();
    };

    const btnGroup = document.createElement("div");
    btnGroup.className = "task-buttons";
    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ description: text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

addBtn.onclick = addTask;
taskInput.onkeypress = (e) => {
  if (e.key === "Enter") addTask();
};

renderTasks();
