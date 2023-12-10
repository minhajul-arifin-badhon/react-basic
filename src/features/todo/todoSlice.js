import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // here state. variable will refer to the one declared in this component. so react.todos means above state var.
    createTodo: (state, action) => {
      console.log(state.todos);
      state.todos.push({
        id: crypto.randomUUID(),
        title: action.payload.title,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      // find and modify instead of map
      let todo = state.todos.find((todo) => todo.id == action.payload.id);
      todo.completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload.id);
    },
  },
});

export const { createTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
