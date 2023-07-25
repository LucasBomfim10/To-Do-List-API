
# To-Do List API

Este é um projeto de exemplo que implementa um To-Do List (Lista de Tarefas) com uma API RESTful usando Node.js e Express. A API permite criar, atualizar, excluir e obter tarefas da lista.

## Instalação

1. Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em [https://nodejs.org](https://nodejs.org).

2. Faça o download ou clone este repositório em sua máquina local.

3. Navegue até o diretório do projeto no terminal.

4. Instale as dependências do projeto usando o npm (Node Package Manager) com o seguinte comando:

```
npm install
```

## Executando o Servidor

Após a instalação das dependências, você pode iniciar o servidor usando o seguinte comando:

```
npm start
```

O servidor estará disponível em `http://localhost:3000`.

## Uso da API

A API possui as seguintes rotas:

1. `GET /api/tasks`: Retorna todas as tarefas da lista.

2. `POST /api/tasks`: Cria uma nova tarefa. A requisição deve conter os dados da tarefa no corpo no formato JSON, incluindo o título da tarefa. Exemplo:

```json
{
  "title": "Comprar mantimentos",
}
```

3. `PUT /api/tasks/:id`: Atualiza uma tarefa existente. O parâmetro `:id` na URL deve ser substituído pelo ID da tarefa que deseja atualizar. A requisição deve conter os dados atualizados da tarefa no corpo no formato JSON. Exemplo:

```json
{
  "title": "Comprar mantimentos",
}
```

4. `DELETE /api/tasks/:id`: Exclui uma tarefa existente. O parâmetro `:id` na URL deve ser substituído pelo ID da tarefa que deseja excluir.

## Exemplos de Uso

### Obter todas as tarefas

```
GET /api/tasks
```

### Criar uma nova tarefa

```
POST /api/tasks

Body:
{
  "title": "Comprar mantimentos"
}
```

### Atualizar uma tarefa

```
PUT /api/tasks/:id

Body:
{
  "title": "Comprar arroz"
}
```

### Excluir uma tarefa

```
DELETE /api/tasks/:id
```

