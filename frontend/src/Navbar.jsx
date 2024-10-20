import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './Navbar.css';

function Navbar() {
    
  return (
    <nav className="navbar">
        <img src={logo} alt="React Logo" className="navbar-logo" />
        <div className="navbar-links">
            <a className='navbar-item' href="#home">Home</a>
            <a className='navbar-item' href="#about">About</a>
            <a className='navbar-item' href="#services">Services</a>
            <a className='navbar-item' href="#contact">Contact</a>
        </div>
    </nav>
  );
}

export default Navbar;
