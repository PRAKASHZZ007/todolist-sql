import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import API from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Theme (unchanged)
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  // 🔥 LOAD FROM MYSQL
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

  // ➕ ADD
  const addTodo = async () => {
    if (input.trim() === "") return;

    await API.post("/", { text: input });
    setInput("");
    fetchTodos();
  };

  // ✅ TOGGLE
  const toggleCheck = async (id) => {
    const todo = todos.find((t) => t.id === id);

    await API.put(`/${id}`, {
      text: todo.text,
      isChecked: !todo.isChecked,
    });

    fetchTodos();
  };

  // ❌ DELETE
  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    fetchTodos();
  };

  // ✏ EDIT
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

  // 🔍 FILTER
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  // ✨ INPUT HANDLING (unchanged)
  const handleInputChange = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setInput(capitalized);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setSearch(capitalized);
  };

  const handleEditInputChange = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setEditText(capitalized);
  };

  const toggleTheme = () => setIsDark(!isDark);

  // 📊 STATUS
  const total = todos.length;
  const completed = todos.filter((todo) => todo.isChecked).length;
  const pending = total - completed;

  return (
    <div className={`app ${isDark ? "dark" : "light"} `}>
      <div className="theme">
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className={`fa ${isDark ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <h1>Todo List</h1>

      <input
        type="text"
        className="input search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearchChange}
      />

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

      <div className="status">
        <p><i className="fa fa-list-ul"></i> Total: {total}</p>
        <p><i className="fa fa-check-circle"></i> Completed: {completed}</p>
        <p><i className="fa fa-hourglass-half"></i> Pending: {pending}</p>
      </div>

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