import React from "react";
import './style/main.css';
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SubmitForm from "./components/SubmitForm";

class ToDoApp extends React.Component {
  state = {items: [], text: ""}
  
  handleSubmit = (newTask) => {
   const newArr = [...this.state.items, newTask];
   this.setState({items: newArr});
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

  render() {
    return (
      <main>
          <Header />
          <section>
            <SubmitForm onSubmit={this.handleSubmit}/>
            <ToDoList items={this.state.items} onDelete={this.handleDelete}/>
          </section>
          <Footer />
      </main>
    )
  }
}

export default ToDoApp;


