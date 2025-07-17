import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://reminder-app-yzau.onrender.com/api/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!text.trim()) {
      alert("Task name is required");
      return;
    }

    try {
      await axios.post(API, { text, description, date });
      setText("");
      setDescription("");
      setDate("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const toggleComplete = async (id, current) => {
    try {
      await axios.patch(`${API}/${id}`, { completed: !current });
      fetchTodos();
    } catch (err) {
      console.error("Error toggling complete:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="container">
      <h1>To do</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 && <p>No tasks yet.</p>}

      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <div className="todo-text">
            <strong>{todo.text}</strong>
          </div>
          {todo.description && (
            <div className="todo-description">{todo.description}</div>
          )}
          <div className="todo-date">
            <strong>Date:</strong>{" "}
            {todo.date
              ? new Date(todo.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not set"}
          </div>

          <div className="todo-actions">
            <button
              className="toggle-btn"
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              ✓
            </button>
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
