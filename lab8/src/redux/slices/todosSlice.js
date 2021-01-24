import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  value: [
    { id: 0, task: "Home work", status: "pending" },
    { id: 2, task: "Lunch", status: "done" },
    { id: 1, task: "Dinner", status: "pending" },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.value.push(action.payload);
      },
      prepare: (task) => {
        return {
          payload: { id: nanoid(10), task: task, status: "pending" },
        };
      },
    },

    deleteTodo: (state, action) => {
      let index = 0;
      state.value.forEach((todo, i) => {
        if (todo.id === action.payload) {
          index = i;
        }
      });
      state.value.splice(index, 1);
    },

    toggleTodo: (state, action) => {
      let index = 0;
      state.value.forEach((todo, i) => {
        if (todo.id === action.payload) {
          index = i;
        }
      });
      state.value[index].status =
        state.value[index].status === "pending" ? "done" : "pending";
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export const selectTodos = (state) => state.todos.value;
export default todosSlice.reducer;
