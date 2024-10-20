import { useEffect, useState } from 'react';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
    const { user, logout, loading } = useUser();
    const navigate = useNavigate();

    const logoutAndRedirect = async () => {
        await logout()
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (loading){
        return (
            <div className='login-hero'>
                <h1>Loading...</h1>
            </div>)
    }

    return (
        <div>
            <button className="logout-button" onClick={logoutAndRedirect}>Logout</button>
        </div>
    );
};

export default Dashboard;
