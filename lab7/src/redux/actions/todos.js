const addTodo = (task) => {
  return {
    type: "ADD_TODO",
    payload: task,
  };
};

const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};

const toggleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    payload: id,
  };
};

export const actions = {
  addTodo,
  deleteTodo,
  toggleTodo,
};
