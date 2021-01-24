
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


export default function TodoList(
  {
    todos,
    handleDeleteItem,
    handleKeyDown,
    handleToggle
  }
)  {
  const classes = useStyles();
 
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
                handleDelete={handleDeleteItem}
                handToggle={handleToggle}
              ></TodoListItem>
            );
          })}
        </List>
      </div>
    );
}