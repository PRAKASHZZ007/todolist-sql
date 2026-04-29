function AddTodo({ input, setInput, addTodo, isDark, setError }) {
  return (
    <div className="input-section">
      <input
        className="input add-input"
        placeholder="Add a task..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (e.target.value.trim() !== "") setError("");
        }}
      />

      <button
        onClick={addTodo}
        className={`button ${isDark ? "dark-button" : "light-button"}`}
      >
        Add
      </button>
    </div>
  );
}

export default AddTodo;