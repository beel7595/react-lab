import React, {useState} from "react";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import TodoListItem from "./TodoListItem";
import { nanoid } from "nanoid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    backgroundColor: theme.palette.background.paper,
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));


export default function TodoList()  {
  const classes = useStyles();
  const [todos,setTodos] = useState([
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
      <div>
        <TextField
          onKeyDown={handleKeyDown}
          className={classes.root}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />

        <List className={classes.root}>
          {todos.map((todo) => {
            return (
              <TodoListItem
                todo={todo.task}
                id={todo.id}
                status={todo.status}
                handleDelete={handleDeleteItem}
                handToggle={handleToggle}
              ></TodoListItem>
            );
          })}
        </List>
      </div>
    );
}