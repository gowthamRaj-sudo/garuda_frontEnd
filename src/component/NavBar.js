import React, { Component } from 'react';
import './style.css';
class NavBar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-container container'>
          <input type='checkbox' id='menu-checkbox' />
          <div className='hamburger-lines'>
            <span className='line line1'></span>
            <span className='line line2'></span>
            <span className='line line3'></span>
          </div>
          <ul className='menu-items'>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Category</a>
            </li>
            <li>
              <a href='#'>Menu</a>
            </li>
            <li>
              <a href='#'>Testimonial</a>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
          </ul>
          <h1 className='logo'>Navbar</h1>
        </div>
      </nav>
    );
  }
}

export default NavBar;
