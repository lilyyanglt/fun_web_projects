import React from 'react';
import '../style/form.css';

class SubmitForm extends React.Component {
  // this is a controlled component

  render() {

    const {onSubmit, onInputChange, term} = this.props;

    return (
      <form onSubmit={(e)=> onSubmit(e, term)}>
            <input type="text" 
              onChange={(e) => onInputChange(e.target.value)}
              value={term}
              placeholder="Enter to-do item..."
            />
            <button className="depthButton">Add</button>
      </form>
    )
  }
};

export default SubmitForm;