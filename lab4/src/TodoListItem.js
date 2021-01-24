import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TodoListItem({
  todo,
  id,
  status,
  handleDelete,
  handToggle,
}) {
  return (
    <ListItem key={id} role={undefined} dense button onClick={handToggle(id)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={status === "done"}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": id }}
        ></Checkbox>
      </ListItemIcon>
      <ListItemText id={id} primary={todo} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments" onClick={handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
