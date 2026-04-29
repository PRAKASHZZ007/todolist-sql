import TodoItem from "./TodoItem";

function TodoList(props) {
  const {
    todos,
    toggleCheck,
    deleteTodo,
    startEditing,
    editingId,
    editText,
    setEditText,
    updateTodo,
    setEditingId,
  } = props;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCheck={() => toggleCheck(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={() => startEditing(todo.id, todo.text)}
          isEditing={editingId === todo.id}
          editText={editText}
          onEditChange={(e) => setEditText(e.target.value)}
          onUpdate={updateTodo}
          onCancel={() => setEditingId(null)}
        />
      ))}
    </ul>
  );
}

export default TodoList;