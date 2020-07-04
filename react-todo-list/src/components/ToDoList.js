import React from 'react';
import Todo from '../components/Todo'
import '../style/todolist.css'

function ToDoList(props) {
  const items = props.items.map((item, index) => {
    return <Todo content={item} key={index} id={index} onDelete={props.onDelete}/>
  } )
  return (
    <div id="todoList">
       {items}
    </div>
  )
}

export default ToDoList;