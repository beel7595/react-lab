import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoItemDetail from "./TodoItemDetail";
import { nanoid } from "nanoid";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "dark",
        },
        typography: {
          // In Chinese and Japanese the characters are usually larger,
          // so a smaller fontsize may be appropriate.
          fontSize: 24,
        },
      }),
    [prefersDarkMode]
  );

  const [todos, setTodos] = useState([
    { id: 0, task: "Home work", status: "pending" },
    { id: 2, task: "Lunch", status: "done" },
    { id: 1, task: "Dinner", status: "pending" },
  ]);

  const handleDeleteItem = (id) => () => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const handleToggle = (id) => () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "pending" ? "done" : "pending",
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setTodos([
        ...todos,
        { id: nanoid(10), task: e.target.value, status: "pending" },
      ]);

      e.target.value = "";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <TodoList
                todos={todos}
                handleDeleteItem={handleDeleteItem}
                handleKeyDown={handleKeyDown}
                handleToggle={handleToggle}
                margin="10px"
              ></TodoList>
            </Route>
            <Route exact path="/todo/:id">
              <TodoItemDetail todos={todos}></TodoItemDetail>
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
