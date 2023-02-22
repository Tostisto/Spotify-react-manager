import { React, useEffect, useState } from 'react';
import { Box, Text, Flex, Stack } from '@chakra-ui/react'

import LoginButton from "./LoginButton";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('access_token');

        if (token) {
            localStorage.setItem('accessToken', token);
        }

        return () => {
            // clean search params
            window.history.replaceState({}, document.title, '/');
        }
    }, []);

    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = `http://localhost:8000/authenticate`;
    };

    return (
        <Box w="100%" p={4}>
            <Flex justifyContent="center" alignItems="center" >
                <Stack spacing={4} w="100%" maxW="md">
                    <Text fontSize="4xl" fontWeight="bold">
                        Spotify Music Player
                    </Text>
                    <LoginButton handleLogin={handleLogin} />
                </Stack>
            </Flex>
        </Box>
    );
}

export default LoginPage;