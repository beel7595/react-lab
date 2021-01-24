import React, { Component } from "react";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import TodoListItem from "./TodoListItem";
import { nanoid } from "nanoid";

const styles = (theme) => ({
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
});

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 0, task: "Home work", status: "pending" },
        { id: 2, task: "Lunch", status: "done" },
        { id: 1, task: "Dinner", status: "pending" },
      ],
    };
  }

  handleDeleteItem = (id) => () => {
    const newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodos });
  };

  handleToggle = (id) => () => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "pending" ? "done" : "pending",
        };
      } else {  
        return todo;
      }
    });
    this.setState({ todos: newTodos });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        todos: [
          ...this.state.todos,
          { id: nanoid(10), task: e.target.value, status: "pending" },
        ],
      });
      e.target.value = "";
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          onKeyDown={this.handleKeyDown}
          className={classes.root}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />

        <List className={classes.root}>
          {this.state.todos.map((todo) => {
            return (
              <TodoListItem
                todo={todo.task}
                id={todo.id}
                status={todo.status}
                handleDelete={this.handleDeleteItem}
                handToggle={this.handleToggle}
              ></TodoListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
export default withStyles(styles)(TodoList);