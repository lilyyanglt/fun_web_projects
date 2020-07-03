import React from 'react';
import '../style/footer.css'

class Footer extends React.Component {
  render() {
    let date = new Date();

    return (
      <footer>
          &copy;{date.getFullYear()} Lily Yang. All Rights Reserved.
      </footer>
    )
  }
}

export default Footer;