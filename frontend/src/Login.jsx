import { useEffect } from 'react';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";
import './Login.css'
import smartphone from'./assets/smartphone.png'
import money from'./assets/money.png'

const Login = () => {
    const { user, loading, login} = useUser();
    const navigate = useNavigate();
    
    const loginAndRedirect = async () => {
        await login();
    }

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    if (loading){
        return (
            <div className='login-hero'>
                <h1>Loading...</h1>
            </div>)
    }

    return (
        <div className='login-hero'>
            <img src={smartphone} alt="React Logo" className="login-smartphone-image" />
            <img src={money} alt="React Logo" className="login-money-image" />
            <div className='login-hero-items'>
                <h1>Start saving now.</h1>
                <p>See how much your device is worth by creating an account. Connect with your local community to help prevent e-waste.</p>
                <button className='login-hero-button' onClick={loginAndRedirect}>Login with Google</button>
            </div>
        </div>
    );
};

export default Login;
