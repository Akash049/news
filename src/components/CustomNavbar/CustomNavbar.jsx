import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl,Button ,NavDropdown} from 'react-bootstrap';
// import {shoppingCart} from 'react-icons-kit/fa/shoppingCart'
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

export default class CustomNavbar extends Component {
  render() {
    return (
      <div className="navbar-space">
          <Navbar bg="light" expand="lg">
              <div className="center-brand">NewsBoard</div>
          </Navbar>
      </div>
    )
  }
}
