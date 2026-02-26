const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>待办事项应用</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { font-size: 2.5rem; margin-bottom: 10px; }
          .input-group { display: flex; gap: 10px; margin-bottom: 20px; }
          .input-group input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
          .input-group button { padding: 10px 20px; background: #000; color: white; border: none; border-radius: 4px; cursor: pointer; }
          .todo-list { list-style: none; }
          .todo-item { display: flex; align-items: center; gap: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px; }
          .todo-item.completed { background: #f5f5f5; opacity: 0.7; }
          .todo-item.completed span { text-decoration: line-through; color: #888; }
          .todo-item input[type="checkbox"] { width: 18px; height: 18px; }
          .todo-item span { flex: 1; }
          .todo-item button { background: none; border: none; color: #999; cursor: pointer; font-size: 18px; }
          .stats { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>待办事项</h1>
            <p>简洁高效的任务管理</p>
          </div>
          
          <div class="input-group">
            <input type="text" id="todoInput" placeholder="添加新的待办事项..." />
            <button onclick="addTodo()">添加</button>
          </div>
          
          <ul id="todoList" class="todo-list"></ul>
          
          <div class="stats" id="stats"></div>
        </div>

        <script>
          let todos = [
            { id: 1, text: '学习 TypeScript', completed: false },
            { id: 2, text: '完成项目开发', completed: false },
            { id: 3, text: '部署到生产环境', completed: true }
          ];

          function renderTodos() {
            const todoList = document.getElementById('todoList');
            const stats = document.getElementById('stats');
            
            todoList.innerHTML = '';
            
            todos.forEach(todo => {
              const li = document.createElement('li');
              li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
              li.innerHTML = \`
                <input type="checkbox" \${todo.completed ? 'checked' : ''} onchange="toggleTodo(\${todo.id})" />
                <span>\${todo.text}</span>
                <button onclick="deleteTodo(\${todo.id})">×</button>
              \`;
              todoList.appendChild(li);
            });
            
            const remaining = todos.filter(todo => !todo.completed).length;
            const completed = todos.filter(todo => todo.completed).length;
            stats.textContent = \`总计 \${todos.length} 个任务，\${remaining} 个进行中，\${completed} 个已完成\`;
          }

          function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text) {
              todos.push({
                id: Date.now(),
                text: text,
                completed: false
              });
              input.value = '';
              renderTodos();
            }
          }

          function toggleTodo(id) {
            todos = todos.map(todo => 
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            renderTodos();
          }

          function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
          }

          document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              addTodo();
            }
          });

          renderTodos();
        </script>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});