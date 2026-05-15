const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const containers = [todo, progress, done];
const tasks = document.querySelectorAll(".task");

let draggedTask = null;

tasks.forEach((task) => {
  task.addEventListener("dragstart", () => {
    draggedTask = task;
    setTimeout(() => {
      task.style.display = "none";
    }, 0);
  });

  task.addEventListener("dragend", () => {
    setTimeout(() => {
      draggedTask.style.display = "block";
      draggedTask = null;
    }, 0);
  });
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
    container.appendChild(draggedTask);
    container.classList.remove("hover-over");
  });
});
