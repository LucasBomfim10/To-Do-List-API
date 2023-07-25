// Variáveis para referenciar elementos HTML
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// Função para buscar as tarefas no servidor
function fetchTasks() {
  fetch("/api/tasks")
    .then((response) => response.json())
    .then((data) => {
      tasks = data;
      renderTasks();
    })
    .catch((error) => {
      console.error("Erro buscando as tarefas:", error);
    });
}

// Função para renderizar as tarefas na página
function renderTasks() {
  taskList.innerHTML = ""; // Limpa a lista de tarefas antes de renderizar

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span class="task-title">${task.title}</span>
      <button class="edit-button" onclick="handleTaskEdit(${task.id})">Editar</button>
      <button class="delete-button" onclick="handleTaskDelete(${task.id})">Excluir</button>
    `;

    taskList.appendChild(taskItem);
  });
}

// Função para adicionar uma nova tarefa
function addTask(taskText) {
  const newTask = {
    title: taskText,
  };

  fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao criar a tarefa");
      }
      return response.json(); // Transforma a resposta em JSON
    })
    .then((createdTask) => {
      tasks.push(createdTask);
      renderTasks();
    })
    .catch((error) => {
      console.error("Erro ao criar a tarefa:", error);
    });
}

// Função para remover uma tarefa
function removeTask(taskId) {
  fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 204) {
        tasks = tasks.filter((task) => task.id !== taskId);
        renderTasks();
      } else if (response.status === 404) {
        console.log("Tarefa não encontrada");
      } else {
        console.log("Erro ao excluir a tarefa");
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir a tarefa:", error);
    });
}

// Função para editar uma tarefa
function editTask(taskId, newTitle) {
  const updatedTask = {
    title: newTitle,
  };

  fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa");
      }
      return response.json(); // Transforma a resposta em JSON
    })
    .then((updatedTask) => {
      tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
      renderTasks();
    })
    .catch((error) => {
      console.error("Erro ao atualizar a tarefa:", error);
    });
}

// Função para lidar com o envio do formulário
function handleFormSubmit(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
}

// Função para lidar com a edição de uma tarefa
function handleTaskEdit(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  const newTitle = prompt("Editar tarefa:", task.title);
  if (newTitle !== null) {
    editTask(taskId, newTitle);
  }
}

// Função para lidar com a exclusão de uma tarefa
function handleTaskDelete(taskId) {
  const confirmDelete = confirm("Tem certeza que deseja excluir esta tarefa?");
  if (confirmDelete) {
    removeTask(taskId);
  }
}

// Chame a função fetchTasks pela primeira vez para buscar as tarefas ao carregar a página
fetchTasks();

// Adicione o evento de envio do formulário
form.addEventListener("submit", handleFormSubmit);
