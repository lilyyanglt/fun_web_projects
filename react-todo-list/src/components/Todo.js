import React from 'react';
import '../style/todolist.css'

function Todo(props) {
  return (
    <div className="list-item">{props.content}
    <span className="delete" onClick={() => props.onDelete(props.id)}>&times;</span>
    </div>
  )
}

export default Todo;