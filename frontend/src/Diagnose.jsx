import { useState } from 'react';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";
import './Diagnose.css'

const Diagnose = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [post, setPost] = useState('');
    const [selectedPhone, setSelectedPhone] = useState('');

    const goBack = async () => {
        navigate('/dashboard')
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        console.log(post);
        setPost('');
    };

    return (
            <div className='diagnose-content'>
                <div className='diagnose-content-container'>
                <button className="hero-button" onClick={goBack}>Back</button>
                
                <h1>What model is your phone?</h1>

                <select value={selectedPhone} onChange={(e) => setSelectedPhone(e.target.value)} className="dropdown">
                    <option value="" disabled>Click here to select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">asdfdsfa</option>
                    <option value="option3">Option 3</option>
                </select>

                <h1>Tell us a little about what's wrong with it.</h1>
                
                <form onSubmit={handlePostSubmit} className="forum-form">
                    <textarea 
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Click here to type..."
                        className="forum-input"
                    />
                    <button type="submit" className="hero-button diagnose-content-button">Submit</button>
                </form>
                </div>
            </div>
    );
};

export default Diagnose;
