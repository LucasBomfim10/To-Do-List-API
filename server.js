const path = require('path');
const express = require('express');
const { SourceTextModule } = require('vm');
const app = express();
const port = 3000;

// Middleware para fazer o parsing do corpo das requisições como JSON
app.use(express.json());

// Pasta onde os arquivos estáticos (HTML, CSS, JS) serão servidos
app.use(express.static(__dirname));

// Array para armazenar as tarefas
let tasks = [];

// Rota para obter as tarefas

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Rota para criar uma tarefa
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;

  // Atribua um ID único à nova tarefa
  newTask.id = tasks.length + 1;

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updateTask = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks[taskIndex].title = updateTask.title;
  res.json(tasks[taskIndex]);
});

// Rota para excluir uma tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

// Rota padrão para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
