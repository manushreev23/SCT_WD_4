let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");
  const taskText = taskInput.value.trim();
  const taskDate = taskDateTime.value;


  const taskselect= document.getElementById("select").value;

  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    date: taskDate,
    select:taskselect,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  taskDateTime.value = "";
  document.getElementById("select").value="";
  
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    console.log(li.className);

    const taskContent = document.createElement("div");
    taskContent.className = "task";
    taskContent.innerHTML = `
      <span>${task.text}</span>
      ${task.date ? `<small>${new Date(task.date).toLocaleString()}</small>` : ""}
    <small>${task.select}</small>
      `;

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const completeButton = document.createElement("button");
    completeButton.className = "complete";
    completeButton.innerText = "✔";
    completeButton.onclick = () => toggleComplete(task.id);

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerText = "✏";
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = "🗑";
    deleteButton.onclick = () => deleteTask(task.id);

    buttons.appendChild(completeButton);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    li.appendChild(taskContent);
    li.appendChild(buttons);
    taskList.appendChild(li);
  });
}

function toggleComplete(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  const newTaskText = prompt("Edit your task:", task.text);
  if (newTaskText === null || newTaskText.trim() === "") return;

  task.text = newTaskText.trim();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}
