import React from 'react';

function Todo(props) {
  return (
    <div>{props.content}
    <span>Delete</span>
    </div>
  )
}

export default Todo;