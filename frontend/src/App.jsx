import { useEffect, useState } from "react";
import { FaListUl, FaCheckCircle, FaClock } from "react-icons/fa";
import TodoItem from "./components/TodoItem";
import API from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");

  // Theme
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  // Load todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (input.trim() === "") {
      setError("Task is required!");
      return;
    }

    setError("");
    await API.post("/", { text: input });
    setInput("");
    fetchTodos();
  };

  // Input handlers
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value.charAt(0).toUpperCase() + value.slice(1));
    if (value.trim() !== "") setError("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value.charAt(0).toUpperCase() + value.slice(1));
  };

  const handleEditInputChange = (e) => {
    const value = e.target.value;
    setEditText(value.charAt(0).toUpperCase() + value.slice(1));
  };

  // Toggle check
  const toggleCheck = async (id) => {
    const todo = todos.find((t) => t.id === id);

    await API.put(`/${id}`, {
      text: todo.text,
      isChecked: !todo.isChecked,
    });

    fetchTodos();
  };

  // Delete
  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    fetchTodos();
  };

  // Edit
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const updateTodo = async () => {
    if (editText.trim() === "") return;

    const todo = todos.find((t) => t.id === editingId);

    await API.put(`/${editingId}`, {
      text: editText,
      isChecked: todo.isChecked,
    });

    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  // Filter
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  // Status
  const total = todos.length;
  const completed = todos.filter((t) => t.isChecked).length;
  const pending = total - completed;

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      {/* Theme toggle */}
      <div className="theme">
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          <i className={`fa ${isDark ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <h1>Todo List</h1>

      {/* Search */}
      <input
        type="text"
        className="input search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* Add */}
      <div className="input-section">
        <input
          type="text"
          className="input add-input"
          placeholder="Add a task..."
          value={input}
          onChange={handleInputChange}
        />

        <button
          onClick={addTodo}
          className={`button ${isDark ? "dark-button" : "light-button"}`}
        >
          Add
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* STATUS */}
<div className="status status-font">
  <p className="status-item">
    <FaListUl className="icon total" />
    Total: {total}
  </p>

  <p className="status-item">
    <FaCheckCircle className="icon completed" />
    Completed: {completed}
  </p>

  <p className="status-item">
    <FaClock className="icon pending" />
    Pending: {pending}
  </p>
</div>

      {/* LIST */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCheck={() => toggleCheck(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => startEditing(todo.id, todo.text)}
            isEditing={editingId === todo.id}
            editText={editText}
            onEditChange={handleEditInputChange}
            onUpdate={updateTodo}
            onCancel={cancelEditing}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;