import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './Home.css';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import { useUser } from './contexts/UserContext';

function Home() {
  const swappingText = [
      "iPhone 11",
      "iPhone 11 Pro",
      "iPhone 11 Pro Max",
      "iPhone XS",
      "iPhone XS Max",
      "iPhone XR",
      "iPhone X",
      "iPhone 8",
      "iPhone 8 Plus",
      "Galaxy S10",
      "Galaxy S10+",
      "Galaxy S10e",
      "Galaxy Note 9",
      "Galaxy S9",
      "Galaxy S9+",
      "Pixel 4",
      "Pixel 4 XL",
      "Pixel 3",
      "Pixel 3 XL",
      "Pixel 2",
      "Pixel 2 XL"
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animateTextClass, setAnimateTextClass] = useState('transition-in');
  const navigate = useNavigate();
  const { user, login } = useUser();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateTextClass('transition-out');
      setTimeout(
        () => {
        setCurrentTextIndex(Math.floor(Math.random() * swappingText.length));
        setAnimateTextClass('transition-in');
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handelGoToDiagnoser = async () => {
    if (!user){
      navigate('/login')
    } else {
      navigate('/diagnose')
    }
  };

  const handelGoToMarketplace = async () => {
    if (!user){
      navigate('/login')
    } else {
      navigate('/marketplace')
    }
  };

  return (
    <>
      <Navbar />
      <section className="hero hero-gradient">
        <div className="hero-content ">
          <h1>Your <span className={`hero-highlight ${animateTextClass}`}>{swappingText[currentTextIndex]}</span></h1>
          <h1>deserves a second chance</h1>
          <p>Find out how your old device can be easily restored at home!</p>
          <button className="hero-button">
            Take me there!
          </button>
        </div>
      </section>

      <section className="main-section dark" id='about'>
        <div className="container">
          <h1><span className={`hero-highlight`}>62 million</span> tonnes of e-waste produced in 2022 alone.</h1>
          <h2>One of the biggest contributors to e-waste is consumers throwing away repairable smartphones. Our mission is to combat this through education and a local community support system. Keep scrolling to find to find how you can help.</h2>
          <h2>Use our Smartphone Repair Diagnoser to find out exactly what's wrong with your device and get helpful self-service instructions, or head over to the Local Community Repair Exchange to find talented local repairers.</h2> 
        </div>
      </section>

      <section className="main-section light" id='services'>
        <div className="container">
          <h2>Services</h2>
          <div className='card-container'>
            <div className="card">
              <h2>Smartphone Repair Diagnoser</h2>
              <p>Easily find out what parts needs to be replaced for your smartphone. Answer a few questions in natural language.</p>
              <button className='hero-button' onClick={handelGoToDiagnoser}>{user ? 'Go to Diagnoser' : 'Create an account'}</button>
            </div>
            <div className="card">
              <h2>Local Community Repair Exchange</h2>
              <p>Find local solutions to your smartphone problems, including local businesses and freelance repairmen.</p>
              <button className='hero-button' onClick={handelGoToMarketplace}>{user ? 'Go to Marketplace' : 'Create an account'}</button>
            </div>
          </div>
        </div>
      </section>  

      <section className="main-section dark" id='contact'>
        <div className="container">
          <div className="logos">
            <img src={logo} className="logo" />
          </div>
          <h2>FixFinder</h2>
          <h2>Email: fixfinder100@gmail.com</h2>
        </div>
      </section>
    </>
  );
}

export default Home;
