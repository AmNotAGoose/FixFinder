import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
            if (userCredential) {
                setUser(userCredential);
                const token = await userCredential.getIdToken();
                setToken(token);
            } else {
                setUser(null);
                setToken(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const token = await userCredential.user.getIdToken();
        setUser(userCredential.user);
        setToken(token);
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
