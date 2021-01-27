import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "./redux/slices/todosSlice";

function TodoListItem({ todo, id, status }) {
  const dispatch = useDispatch();

  return (
    <ListItem key={id} role={undefined} dense button>
      <ListItemIcon>
        <Checkbox
          onClick={() => {
            dispatch(
              toggleTodo({ id: id, task: todo, status: status ? false : true })
            );
          }}
          edge="start"
          checked={status}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": id }}
        ></Checkbox>
      </ListItemIcon>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/todo/${id}`}
      >
        <ListItemText id={id} primary={todo} />
      </Link>

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => {
            dispatch(deleteTodo(id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TodoListItem;
