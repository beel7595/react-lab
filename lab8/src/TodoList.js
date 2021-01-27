import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import TodoListItem from "./TodoListItem";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, loadTodos, selectTodos } from "./redux/slices/todosSlice";

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

function TodoList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(addTodo({ task: e.target.value, status: false }));
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
              key={nanoid(10)}
              todo={todo.task}
              id={todo.id}
              status={todo.status}
            ></TodoListItem>
          );
        })}
      </List>
    </div>
  );
}

export default TodoList;
