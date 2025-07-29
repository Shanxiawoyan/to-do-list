import { useState } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editText, setEditText] = useState({}); 

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, editing: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  const toggleEdit = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setEditText({ ...editText, [id]: todo.text }); 
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, editing: true } : todo)
    );
  };

  const saveTodo = (id) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, text: editText[id], editing: false } : todo)
    );
  };

  const cancelEdit = (id) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, editing: false } : todo)
    );
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add your task"
        />
        <button className="add-btn" onClick={addTodo}>ADD</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input type="checkbox" checked={todo.completed || false} onChange={() => toggleComplete(todo.id)} />
            {todo.editing ? (
              <input
                type="text"
                value={editText[todo.id] || ""}
                onChange={(e) => setEditText({ ...editText, [todo.id]: e.target.value })}
                autoFocus
              />
            ) : (
              <span>{todo.text}</span>
            )}
            {todo.editing ? (
              <>
                <button onClick={() => saveTodo(todo.id)}>Save</button>
                <button onClick={() => cancelEdit(todo.id)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => toggleEdit(todo.id)}>Edit</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
