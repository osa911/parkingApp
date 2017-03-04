import React, { Component } from 'react';
import { Link } from "react-router";
import { Navbar } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header style={{ float: 'left' }}>
          <Navbar.Brand>
            <Link to="/">
              Главная
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
