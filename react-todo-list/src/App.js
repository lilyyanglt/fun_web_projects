import React from "react";
import './style/main.css';
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Header from "./components/Header";

class ToDoApp extends React.Component {
  state = {items: [], text: "", error: ""}

  handleChange = (e) => {
    this.setState({text: e.target.value})
  }
  
  handleSubmit = (e) => {
    if (this.state.text.length === 0) return;

    const item = this.state.text;

    this.setState(state => {
      return {items: state.items.concat(item), text: ""}
    });
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
          <div id="input-area">
            <input type="text" 
              onChange={this.handleChange}
              value={this.state.text}
              placeholder="Enter to-do item..."
            />
            <div id="buttons-area">
              <button className="depthButton"
                onClick={this.handleSubmit}>Add</button>
              <button className="depthButton"
                onClick={this.handleDelete}>Delete</button>
            </div>
          </div>
          <Error message={this.state.error}/>
          <ToDoList items={this.state.items}/>

        <Footer />
      </main>
    )
  }
}

export default ToDoApp;


