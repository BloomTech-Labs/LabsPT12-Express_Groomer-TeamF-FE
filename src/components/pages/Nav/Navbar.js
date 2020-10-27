import React, { Component } from 'react';
import ClientNav from './ClientNav';
import GroomerNav from './GroomerNav';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClient: false,
    };
  }

  render() {
    return this.state.isClient ? (
      <div>
        <ClientNav />
      </div>
    ) : (
      <div>
        <GroomerNav />
      </div>
    );
  }
}

export default Navbar;
