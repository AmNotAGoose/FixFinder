import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './Home.css';
import Navbar from './Navbar';

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

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>Your <span className={`hero-highlight ${animateTextClass}`}>{swappingText[currentTextIndex]}</span></h1>
          <h1>deserves a second chance</h1>
          <p>Find out how your device can be restored easily, at home!</p>
          <button className="hero-button">
            Take me there!
          </button>
        </div>
      </section>

      <section className="main-section dark">
        <div className="container">
          <h2>placeholder</h2>
        </div>
      </section>

      <section className="main-section light">
        <div className="container">
          <h2>placeholder</h2>
          <div className='card-container'>
            <div className="card">
              <h2>ajwirfeijfraewij</h2>
              <p>asdfdasfgrweagtasfrgdgarefs</p>
            </div>
            <div className="card">
              <h2>ajwirfeijfraewij</h2>
              <p>asdfdasfgrweagtasfrgdgarefs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="main-section dark">
        <div className="container">
          <h2>placeholder</h2>
          <div className="logos">
            <img src={logo} alt="React Logo" className="logo" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
