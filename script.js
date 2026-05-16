let savedTasks = JSON.parse(localStorage.getItem("kanban-tasks")) || [];

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const containers = [todo, progress, done];
let draggedTask = null;

function saveToLocalStorage() {
  localStorage.setItem("kanban-tasks", JSON.stringify(savedTasks));
}

function updateTaskCount() {
  [todo, progress, done].forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");
    count.innerText = tasks.length;
  });
}

updateTaskCount();

function attachTaskEvents(task) {
  task.addEventListener("dragstart", () => {
    draggedTask = task;
    setTimeout(() => {
      task.style.display = "none";
    }, 0);
  });

  task.addEventListener("dragend", () => {
    setTimeout(() => {
      if (draggedTask) {
        draggedTask.style.display = "";
      }
      draggedTask = null;
    }, 0);
  });

  const deleteBtn = task.querySelector("button");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const taskId = task.getAttribute("data-id");
      savedTasks = savedTasks.filter((t) => t.id !== taskId);
      saveToLocalStorage();
      task.remove();
      updateTaskCount();
    });
  }
}

const initialTasks = document.querySelectorAll(".task");
initialTasks.forEach((task) => {
  attachTaskEvents(task);
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  container.addEventListener("dragenter", (e) => {
    e.preventDefault();
    container.classList.add("hover-over");
  });

  container.addEventListener("dragleave", () => {
    container.classList.remove("hover-over");
  });

  container.addEventListener("drop", () => {
    if (draggedTask) {
      container.appendChild(draggedTask);
      const taskId = draggedTask.getAttribute("data-id");
      const taskObject = savedTasks.find((t) => t.id === taskId);
      if (taskObject) {
        taskObject.status = container.id;
      }

      saveToLocalStorage();
      updateTaskCount();
    }
    container.classList.remove("hover-over");
  });
});

const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
  const taskTitleInput = document.querySelector(".modal .center input");
  const taskDescInput = document.querySelector(".modal .center textarea");

  const taskTitle = taskTitleInput.value;
  const taskDesc = taskDescInput.value;

  if (taskTitle.trim() === "") return;

  const taskObject = {
    id: Date.now().toString(),
    title: taskTitle,
    desc: taskDesc,
    status: "todo",
  };

  savedTasks.push(taskObject);
  saveToLocalStorage();

  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.setAttribute("data-id", taskObject.id);
  div.innerHTML = `
    <h1>${taskTitle}</h1>
    <p>${taskDesc}</p>
    <button>Delete</button>
  `;

  attachTaskEvents(div);

  todo.appendChild(div);
  updateTaskCount();
  taskTitleInput.value = "";
  taskDescInput.value = "";

  modal.classList.remove("active");
});

function loadTasks() {
  todo.querySelectorAll(".task").forEach((t) => t.remove());
  progress.querySelectorAll(".task").forEach((t) => t.remove());
  done.querySelectorAll(".task").forEach((t) => t.remove());

  savedTasks.forEach((taskObject) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.setAttribute("data-id", taskObject.id);
    div.innerHTML = `
      <h1>${taskObject.title}</h1>
      <p>${taskObject.desc}</p>
      <button>Delete</button>
    `;

    attachTaskEvents(div);

    if (taskObject.status === "todo") {
      todo.appendChild(div);
    } else if (taskObject.status === "progress") {
      progress.appendChild(div);
    } else if (taskObject.status === "done") {
      done.appendChild(div);
    }
  });

  updateTaskCount();
}

loadTasks();
