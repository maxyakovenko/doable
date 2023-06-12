const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()


server.use(middlewares)
server.use(jsonServer.bodyParser)
server.post('/todos/add', (req, res) => {
  const { todos: todosToAdd } = req.body;
  const db = router.db;
  const { todos } = db.getState();
  todosToAdd.forEach(todo => todos.push(todo));
  db.write();
  res.send();
})
server.post('/todos/delete', (req, res) => {
  const { ids } = req.body;
  const db = router.db;
  db.get('todos')
    .remove(todo => ids.includes(todo.id))
    .write();
  res.send();
})
server.post('/todos/complete', (req, res) => {
  const { ids } = req.body;
  const db = router.db;
  const { todos } = db.getState(); 
  todos.forEach(todo => {
    if (ids.includes(todo.id)) {
      todo.completed = true;
    }
  });
  db.write();
  res.send();
})
server.post('/todos/uncomplete', (req, res) => {
  const { ids } = req.body;
  const db = router.db;
  const { todos } = db.getState(); 
  todos.forEach(todo => {
    if (ids.includes(todo.id)) {
      todo.completed = false;
    }
  });
  db.write();
  res.send();
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})