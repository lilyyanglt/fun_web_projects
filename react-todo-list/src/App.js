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

  handleDelete = (e) => {
    const originalItems = this.state.items;
    let matched = false;

    originalItems.forEach(items => {
      if (items === this.state.text) {
        matched = true;
      }
    })

      if (matched) {
        const updatedItems = this.state.items.filter(item => item !== this.state.text)
        this.setState({items: updatedItems, text: ''})
      } else {
        this.setState({error: "nothing matched to delete"})
      }
    }

  render() {
    return (
      <main>
          <Header />
          <SubmitForm onSubmit={this.handleSubmit}/>
          <ToDoList items={this.state.items}/>
          <Footer />
      </main>
    )
  }
}

export default ToDoApp;


