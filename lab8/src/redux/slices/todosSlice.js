import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
};

const API_ENDPOINT = "https://60103a806c21e1001705025e.mockapi.io/";

export const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}Todos`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT}Todos`, newTodo);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (todo, thunkAPI) => {
    try {
      const { data } = await axios.put(`${API_ENDPOINT}Todos/${todo.id}`, todo);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${API_ENDPOINT}Todos/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  extraReducers: {
    [loadTodos.pending]: (state, action) => {
      console.log("Loading");
    },
    [loadTodos.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [loadTodos.rejected]: (state, action) => {
      console.log("Error on loading...");
    },
    [addTodo.pending]: (state, action) => {
      console.log("Loading");
    },
    [addTodo.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    },
    [addTodo.rejected]: (state, action) => {
      console.log("Error on loading...");
    },
    [deleteTodo.pending]: (state, action) => {
      console.log("Loading");
    },
    [deleteTodo.fulfilled]: (state, action) => {
      let index = 0;
      state.value.forEach((todo, i) => {
        if (todo.id === action.payload.id) {
          index = i;
        }
      });
      state.value.splice(index, 1);
    },
    [deleteTodo.rejected]: (state, action) => {
      console.log("Error on loading...");
    },
    [toggleTodo.pending]: (state, action) => {
      console.log("Loading");
    },
    [toggleTodo.fulfilled]: (state, action) => {
      state.value = state.value.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        } else {
          return action.payload;
        }
      });
    },
    [toggleTodo.rejected]: (state, action) => {
      console.log("Error on loading...");
    },
  },
});

export const selectTodos = (state) => state.todos.value;
export default todosSlice.reducer;
