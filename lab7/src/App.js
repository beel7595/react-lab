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

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <TodoList margin="10px"></TodoList>
            </Route>
            <Route exact path="/todo/:id">
              <TodoItemDetail></TodoItemDetail>
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
