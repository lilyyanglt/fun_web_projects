import React from 'react';
import '../style/error.css';

function Error(props) {
  return (
    <p className="error">{props.message}<span></span></p>
  )
}

export default Error;