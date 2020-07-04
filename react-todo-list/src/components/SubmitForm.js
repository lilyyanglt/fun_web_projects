import React from 'react';
import '../style/form.css';

class SubmitForm extends React.Component {
  // this is a controlled component
  state = {text: ''}
  
  handleChange = (e) => {
    this.setState({text: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.text.length === 0) return;
    this.props.onSubmit(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
            <input type="text" 
              onChange={this.handleChange}
              value={this.state.text}
              placeholder="Enter to-do item..."
            />
            <div id="buttons-area">
              <button className="depthButton"
                onClick={this.handleSubmit}>Add</button>
            </div>
      </form>
    )
  }
};

export default SubmitForm;