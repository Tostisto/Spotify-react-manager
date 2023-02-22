import React, { useEffect, useState, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { UserContext } from '../context';

function LoginButton() {
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser, accessToken, setAccessToken } = useContext(UserContext);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('access_token');

        if (token) {
            localStorage.setItem('accessToken', token);
            setAccessToken(token);
        }

        return () => {
            window.history.replaceState({}, document.title, '/');
        }
    }, []);

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = `http://localhost:8000/authenticate`;
    };

    return (
        <>
            <Button disabled={isLoading} onClick={handleLogin}>
                {isLoading ? 'Loading...' : 'Login with Spotify'}
            </Button>
        </>
    );
}

export default LoginButton;
