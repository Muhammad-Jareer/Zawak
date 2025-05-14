import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function AuthGuard({ children }) {
    const navigate = useNavigate();
    const [isOk, setIsOk] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            console.log(authStatus)
            setIsOk(authStatus);
            if (!authStatus) {
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]); 

    if (isOk === null) {
        return <p className='h-96 w-full text-xl'>Loading...</p>;
    }

    return isOk ? children : null; 
}

export default AuthGuard;


// I think new auth check from db is more ok then useAuth
