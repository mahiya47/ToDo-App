const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const containers = [todo, progress, done];
let draggedTask = null;

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
      task.remove();
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

  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
    <h1>${taskTitle}</h1>
    <p>${taskDesc}</p>
    <button>Delete</button>
  `;

  attachTaskEvents(div);

  todo.appendChild(div);

  taskTitleInput.value = "";
  taskDescInput.value = "";

  modal.classList.remove("active");
});
