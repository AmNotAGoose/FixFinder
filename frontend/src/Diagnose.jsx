import { useEffect, useState } from 'react';
import { useUser } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";
import './Diagnose.css'
import { getModels, getArticles } from './services/api';

const Diagnose = () => {
    const { token, user, logout } = useUser();
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [selectedPhone, setSelectedPhone] = useState('');
    const [phoneModels, setPhoneModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            if (token) {
                await getModels(token).then(response => {
                    const models = response.map(e => ({
                        name: e.name,
                    }));
                    setPhoneModels(models);
                })
            }
        };

        fetchModels();
    }, [token]);

    const goBack = async () => {
        navigate('/dashboard')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/selfrepair', { state: { message: 'Selected phone model: ' + selectedPhone + '\nProblem: ' + description } });
        setDescription('');
    };

    return (
        <div className='diagnose-content'>
            <div className='diagnose-content-container'>
                <button className="hero-button" onClick={goBack}>Back</button>
                
                <h1>What model is your phone?</h1>

                <select value={selectedPhone} onChange={(e) => setSelectedPhone(e.target.value)} className="dropdown">
                    <option value="" disabled>Click here to select an option</option>
                    {phoneModels.map((model, index) => (
                        <option key={index} value={model.name}>{model.name}</option>
                    ))}
                </select>

                <h1>Tell us a little about what's wrong with it.</h1>
                
                <form onSubmit={handleSubmit} className="forum-form">
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
