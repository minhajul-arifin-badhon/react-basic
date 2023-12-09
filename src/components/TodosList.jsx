export default function TodosList({ todos, manageTodos }) {
  return (
    <ul className="list">
      {todos.length == 0 && "No Todos"}
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  manageTodos("toggle", {
                    id: todo.id,
                    checked: e.target.checked,
                  })
                }
              ></input>
              {todo.title}
            </label>
            <button
              className="btn btn-danger"
              onClick={() => manageTodos("delete", { id: todo.id })}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
