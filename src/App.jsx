import { useState } from "react";
import "./styles.css";

export default function App() {
  // always use the set function to mutate the state variable
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  console.log("rendering app");

  // updating it like this will create an infitie loop
  // setNewItem("item");
  // everytime a set function call it runs the whole component again.

  function handleSubmit(e) {
    e.preventDefault();
    // this will prevent the form from refreshing the page when submitted.

    // this takes in the current todos (todos we had in the last state) and add new item to it.
    // setTodos([
    //   ...todos,
    //   { id: crypto.randomUUID(), title: newItem, completed: false },
    // ]);

    // it looks like the compiler runs all the lines and then calls the set functions to take effect and rerender everthing again.
    // console.log(todos);
    // console.log("updating todos");

    // this won't add the item second time to the todo array, as todos is still what we had in the last state.
    // setTodos([
    //   ...todos,
    //   { id: crypto.randomUUID(), title: newItem, completed: false },
    // ]);

    // passing a function to the set methods allows to make changes to the latest todos, not what we had in previous state. so, multiple append works in this way.
    // so anytime we want to use a current value, we should update like this (passing a function).
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);

    // setTodos((currentTodos) => [
    //   ...currentTodos,
    //   { id: crypto.randomUUID(), title: newItem, completed: false },
    // ]);

    console.log(todos);
    console.log("Updating todos");

    setNewItem("");
  }

  function toggleTodo(id, checked) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id == id ? { ...todo, completed: checked } : todo
      );
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  console.log("state todos: ", todos);

  //  question: for events like onChange why pass ()=> {} like this?
  // question: what is short circuiting?

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length == 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                ></input>
                {todo.title}
              </label>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
