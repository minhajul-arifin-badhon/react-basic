import { createTodo, deleteTodo, toggleTodo } from "../features/todo/todoSlice";
import "../styles.css";
import TodosForm from "./TodosForm";
import TodosList from "./TodosList";
import { useSelector, useDispatch } from "react-redux";

export default function Todo() {
  const todos = useSelector((state) => state.todo.todos); // state.reducer (mentioned in configureStore).variable
  const dispatch = useDispatch();

  function manageTodos(action, payload) {
    switch (action) {
      case "create":
        dispatch(createTodo({ title: payload.title }));
        break;
      case "toggle":
        dispatch(toggleTodo({ id: payload.id, completed: payload.checked }));
        break;
      case "delete":
        dispatch(deleteTodo({ id: payload.id }));
        break;
    }
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
