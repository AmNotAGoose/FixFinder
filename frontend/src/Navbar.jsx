import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './Navbar.css';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout, login } = useUser();
  const navigate = useNavigate();

  const handleScrollToServices = async () => {
    if (!user){
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
      navigate('/login')
    } else {
      await logout()
    }
  };

  return (
    <nav className="navbar">
        <img src={logo} alt="React Logo" className="navbar-logo" />
        <div>
            <a className='navbar-item' href="#home">Home</a>
            <a className='navbar-item' href="#about">About</a>
            <a className='navbar-item' href="#services">Services</a>
            <a className='navbar-item' href="#contact">Contact</a>
        </div>
        <div className="navbar-right">
            <button className='hero-button' onClick={handleScrollToServices}>{user ? 'Log out' : 'Log in'}</button>
        </div>
    </nav>
  );
}

export default Navbar;
