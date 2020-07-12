import React from "react";
import './style/main.css';
import { ToDoList, Header, SubmitForm, Footer } from './components/index'

class ToDoApp extends React.Component {
  state = {items: [], text: ''}
  
  handleSubmit = (e, newTask) => {
    e.preventDefault();
   const newArr = [...this.state.items, newTask];
   this.setState({items: newArr, text: ''});
  }

  /**
   * @param index - the index of item to be deleted
   */
  handleDelete = (index) => {
    const newArr = [...this.state.items]
    // removes the item in that index
    newArr.splice(index,1)
    this.setState({items: newArr});
  }

  handleChange = (value) => {
    this.setState({...this.state, text: value})
  }

  render() {
    return (
      <main>
          <Header />
          <section>
            <SubmitForm 
            onSubmit={this.handleSubmit}
            onInputChange={this.handleChange}
            term={this.state.text}/>
            <ToDoList items={this.state.items} onDelete={this.handleDelete}/>
          </section>
          <Footer />
      </main>
    )
  }
}

export default ToDoApp;


