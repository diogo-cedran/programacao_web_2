const taskKey = "@tasks";

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector("#taskList");

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.description}</p>
    `;

    const editButton = createEditButton(task);

    li.appendChild(editButton);
    taskList.appendChild(li);
  });
});

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault();

  const taskId = new Date().getTime();
  const taskList = document.querySelector("#taskList");

  const form = document.querySelector("#taskForm");
  const formData = new FormData(form);

  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");

  const li = document.createElement("li");

  const task = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  };

  li.id = taskId;
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `;

  const editButton = createEditButton(task);

  li.appendChild(editButton);
  taskList.appendChild(li);
  saveTask(task);
  form.reset();
}

// Função para salvar tarefas no localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push(task);
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

// Função para abrir o diálogo de edição da tarefa
function openEditDialog(task) {
  const form = document.createElement("form");
  const dialog = document.createElement("dialog");

  const div = document.createElement("div");
  const taskTitleInput = document.createElement("input");
  const taskDescriptionInput = document.createElement("input");

  const editButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  form.className = "form-edit";
  dialog.className = "dialog-edit";

  form.appendChild(taskTitleInput);
  form.appendChild(taskDescriptionInput);
  div.appendChild(editButton);
  div.appendChild(cancelButton);
  form.appendChild(div);

  dialog.appendChild(form);
  document.body.appendChild(dialog);

  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;

  editButton.innerHTML = "Editar Tarefa";
  cancelButton.innerHTML = "Cancelar";

  editButton.onclick = () => {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          title: taskTitleInput.value,
          description: taskDescriptionInput.value,
        };
      }

      return t;
    });

    localStorage.setItem(taskKey, JSON.stringify(updatedTasks));
    dialog.close();
  };

  cancelButton.onclick = () => {
    dialog.close();
  };

  dialog.showModal();
}

// Função para criar botão de edição
function createEditButton(task) {
  const editButton = document.createElement("button");

  editButton.innerHTML = "✏️";
  editButton.title = "Editar tarefa";
  editButton.className = "edit-button";

  editButton.onclick = () => {
    openEditDialog(task);
  };

  return editButton;
}
