import React from 'react';
import '../style/navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul>
          <li><a className="active" href="#home">About Us</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#donate">Donate</a></li>
        </ul> 
      </nav>
    )
  }
}

export default Navbar;