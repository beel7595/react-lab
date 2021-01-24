import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import TodoListItem from "./TodoListItem";

import { nanoid } from "nanoid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actions } from "./redux/actions/todos";

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

function TodoList({ todos, addTodo, tollgeTodo, deleteTodo }) {
  const classes = useStyles();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addTodo(e.target.value);
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

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapActionToProps = {
  addTodo: actions.addTodo,
  // deleteTodo: actions.deleteTodo,
  // tollgeTodo: actions.tollgeTodo,
};
export default connect(mapStateToProps, mapActionToProps)(TodoList);
