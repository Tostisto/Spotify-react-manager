import { React, useContext, useEffect, useState } from 'react';
import { ChakraProvider, Box, Spinner, Center } from '@chakra-ui/react';
import { UserContext } from './context';
import Navbar from "./Components/NavBar";
import UserInfoBox from "./Components/UserInfoBox";

const Account = () => {
    const { user, setUser, accessToken, setAccessToken } = useContext(UserContext);
    const [playlists, setPlaylists] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (!storedAccessToken) {
            setIsLoading(false);
            return;
        }

        setAccessToken(storedAccessToken);

        setIsLoading(true);
        fetch(`http://127.0.0.1:8000/user?access_token=${storedAccessToken}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch((error) => console.error('Error:', error));

        fetch(`http://127.0.0.1:8000/user_playlists?access_token=${storedAccessToken}`)
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch((error) => console.error('Error:', error))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <Box height="100vh" width="100%" display="flex" justifyContent="center" alignItems="center">
                <Spinner size="xl" color="purple.500" />
            </Box>
        );
    }
    return (
        <ChakraProvider>
            <Navbar user={user} />
            <Center p="5%">
                <UserInfoBox user={user} />
            </Center>
        </ChakraProvider>
    );
};

export default Account;
