import { useEffect, useState } from "react";
import API from "./api";

import SearchBar from "./components/SearchBar";
import AddTodo from "./components/AddTodo";
import ThemeToggle from "./components/ThemeToggle";
import StatusFilter from "./components/StatusFilter";
import EmptyState from "./components/EmptyState";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [showStatus, setShowStatus] = useState(false);

  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await API.get("/");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!input.trim()) {
      setError("Task is required!");
      return;
    }
    setError("");
    await API.post("/", { text: input });
    setInput("");
    fetchTodos();
  };

  const toggleCheck = async (id) => {
    const todo = todos.find((t) => t.id === id);
    await API.put(`/${id}`, {
      text: todo.text,
      isChecked: !todo.isChecked,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    fetchTodos();
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTodo = async () => {
    const todo = todos.find((t) => t.id === editingId);
    await API.put(`/${editingId}`, {
      text: editText,
      isChecked: todo.isChecked,
    });
    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  const total = todos.length;
  const completed = todos.filter((t) => t.isChecked).length;
  const pending = total - completed;

  const filteredTodos = todos
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .filter((t) =>
      filter === "completed"
        ? t.isChecked
        : filter === "pending"
        ? !t.isChecked
        : true
    );

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

      <h1>Todo List</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        toggleFilter={() => setShowStatus(!showStatus)}
      />

      <AddTodo
        input={input}
        setInput={setInput}
        addTodo={addTodo}
        isDark={isDark}
        setError={setError}
      />

      {error && <p className="error-text">{error}</p>}

      {showStatus && (
        <StatusFilter
          total={total}
          completed={completed}
          pending={pending}
          setFilter={setFilter}
        />
      )}

      {filteredTodos.length === 0 ? (
        <EmptyState search={search} filter={filter} />
      ) : (
        <TodoList
          todos={filteredTodos}
          toggleCheck={toggleCheck}
          deleteTodo={deleteTodo}
          startEditing={startEditing}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          updateTodo={updateTodo}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
}

export default App;