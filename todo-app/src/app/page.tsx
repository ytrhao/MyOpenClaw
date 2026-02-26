'use client';

import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: '学习 TypeScript', completed: false },
    { id: '2', text: '完成项目开发', completed: false },
    { id: '3', text: '部署到生产环境', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">待办事项</h1>
          <p className="text-gray-600">简洁高效的任务管理</p>
        </div>

        {/* Add Todo Form */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新的待办事项..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            添加
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 font-medium ${
              filter === 'all' 
                ? 'text-black border-b-2 border-black' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            全部 ({todos.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 font-medium ${
              filter === 'active' 
                ? 'text-black border-b-2 border-black' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            进行中 ({remainingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 font-medium ${
              filter === 'completed' 
                ? 'text-black border-b-2 border-black' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            已完成 ({todos.length - remainingCount})
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {filter === 'all' ? '暂无待办事项' : 
               filter === 'active' ? '没有进行中的任务' : 
               '没有已完成的任务'}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 border border-gray-200 rounded ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-50 transition-colors`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className={`flex-1 ${
                  todo.completed ? 'completed-text' : ''
                }`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              总计 {todos.length} 个任务，
              {remainingCount} 个进行中，
              {todos.length - remainingCount} 个已完成
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
