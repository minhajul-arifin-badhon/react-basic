import { useState } from "react";
import "../styles.css";
import TodosForm from "./TodosForm";
import TodosList from "./TodosList";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  function manageTodos(action, payload) {
    switch (action) {
      case "create":
        createTodo(payload.title);
        break;
      case "toggle":
        toggleTodo(payload.id, payload.checked);
        break;
      case "delete":
        deleteTodo(payload.id);
        break;
    }
  }

  function createTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: title, completed: false },
    ]);
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

  return (
    <>
      <h1 className="header">Todo List</h1>
      <TodosForm manageTodos={manageTodos}></TodosForm>
      <br></br>
      <TodosList todos={todos} manageTodos={manageTodos}></TodosList>
    </>
  );
}
