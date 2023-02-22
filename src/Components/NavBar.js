import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    Center,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const Navbar = (props) => {

    const LogOut = () => {
        localStorage.removeItem('accessToken');
        window.location.reload();
    }

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Link to="/"> <Button variant="link">Home</Button></Link>
                </Box>
                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={7}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={props.user.user.images.length === 0 ? '/images/image.png' : props.user.user.images[0].url}
                                />
                            </MenuButton>
                            <MenuList alignItems={'center'}>
                                <br />
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={props.user.user.images.length === 0 ? '/images/image.png' : props.user.user.images[0].url}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <p>{props.user.user.display_name}</p>
                                </Center>
                                <br />
                                <MenuDivider />
                                <Link to="/playlists">
                                    <MenuItem>Manage playlists</MenuItem>
                                </Link>

                                <Link to="/account">
                                    <MenuItem>Manage account</MenuItem>
                                </Link>
                                <MenuItem onClick={LogOut}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;