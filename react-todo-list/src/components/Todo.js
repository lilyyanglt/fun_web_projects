import React from 'react';

function Todo(props) {
  return (
    <div>{props.content}
    <span onClick={() => props.onDelete(props.id)}>Delete</span>
    </div>
  )
}

export default Todo;