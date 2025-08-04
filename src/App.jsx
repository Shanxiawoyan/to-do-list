import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editText, setEditText] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text: newTodo, completed: false, editing: false },
      ]);
      setNewTodo("");
      inputRef.current.focus();
    }
  }, [newTodo]);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  }, []);

  const toggleEdit = useCallback((id) => {
    const todo = todos.find(todo => todo.id === id);
    setEditText(prev => ({ ...prev, [id]: todo.text }));
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, editing: true } : todo)
    );
  }, [todos]);

  const saveTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, text: editText[id], editing: false } : todo)
    );
  }, [editText]);

  const cancelEdit = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, editing: false } : todo)
    );
  }, []);

  const pendingTodos = useMemo(() => todos.filter(todo => !todo.completed), [todos]);
  const completedTodos = useMemo(() => todos.filter(todo => todo.completed), [todos]);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          ref={inputRef}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add your task"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button className="add-btn" onClick={addTodo}>ADD</button>
      </div>

      <div className="task-columns">
        <div className="task-column">
          <h3>Pending Tasks</h3>
          <ul>
            {pendingTodos.map(todo => (
              <li key={todo.id}>
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
                  <button onClick={() => toggleEdit(todo.id)}>✏️</button>
                )}
                <button onClick={() => toggleComplete(todo.id)}>➡️</button>
                <button onClick={() => deleteTodo(todo.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="task-column">
          <h3>Completed Tasks</h3>
          <ul>
            {completedTodos.map(todo => (
              <li key={todo.id} className="completed">
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
                  <button onClick={() => toggleEdit(todo.id)}>✏️</button>
                )}
                <button onClick={() => toggleComplete(todo.id)}>⬅️</button>
                <button onClick={() => deleteTodo(todo.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
