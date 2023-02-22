import React, { useContext, useEffect, useState } from 'react';
import { ChakraProvider, Skeleton } from '@chakra-ui/react'

import Navbar from "./Components/NavBar";
import SearchForm from "./Components/SearchForm";
import MusicControls from "./Components/MusicControls ";
import LoginPage from "./Components/LoginPage";
import { UserContext } from './context';

function Home() {

    const { user, setUser, accessToken, setAccessToken } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        setAccessToken(storedAccessToken);

        const handleStorageChange = (e) => {
            if (e.key === 'accessToken') {
                setAccessToken(accessToken);
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setAccessToken]);

    useEffect(() => {
        if (accessToken !== null) {
            fetch(`http://127.0.0.1:8000/user?access_token=${accessToken}`)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [accessToken, setUser]);

    if (isLoading) {
        return (
            <ChakraProvider>
                <Skeleton h="100vh" w="100%" />
            </ChakraProvider>
        );
    } else if (accessToken === null || user === null) {
        return (
            <ChakraProvider>
                <LoginPage />
            </ChakraProvider>
        );
    } else {
        return (
            <ChakraProvider>
                <Navbar user={user} />
                <SearchForm />
                <MusicControls />
            </ChakraProvider>
        );
    }
}

export default Home;
