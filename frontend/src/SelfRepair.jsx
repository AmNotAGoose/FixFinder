import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './SelfRepair.css';
import { useLocation } from "react-router-dom";
import { getArticles } from './services/api';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";



function SelfRepair() {
    const location = useLocation();
    const message = location.state?.message || '';
    const [articles, setArticles] = useState(null);
    const { token, user, logout } = useUser();
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadArticles = async () => {
            setArticles(await getArticles(token, message));
        }
        loadArticles();
    }, [message, articles, getArticles, setArticles])

    if (!articles) {
        return (
            <div className='login-hero'>
                <div className="logos">
                    <img src={logo} className="logo" />
                </div>
                <h1>Loading...</h1>
            </div>)
    }
    
    const goToDashboard = async () => {
        navigate('/')
    }

    const goToMarketplace = async () => {
        navigate('/marketplace')
    }

    return (
    <div className='selfrepair-content'>
        <div className='selfrepair-content-container'>
            
            <h1>Your phone likely has a <span className='hero-highlight'>{articles?.split('repair')[0].trim()}</span> problem.</h1>  

            <h1>Follow this guide to self-repair your device:</h1>
            <h2 className='selfrepair-instruction'>
                {articles}
            </h2>
            <button className="hero-button selfrepair-content-button" onClick={goToDashboard}>Back to Dashboard</button>
            <button className="hero-button selfrepair-content-button" onClick={goToMarketplace}>Visit marketplace</button>
        </div>
    </div>
    );
}

export default SelfRepair;
