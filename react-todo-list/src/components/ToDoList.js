import React from 'react';
import '../style/todolist.css'

function ToDoList(props) {
  return (
    <ul id="todoList">
       {props.items.map(item => (<li key={item.id} className="todo_item">{item}</li>))}
    </ul>
  )
}

export default ToDoList;