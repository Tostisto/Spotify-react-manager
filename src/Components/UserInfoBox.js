import { React } from 'react';
import { Flex, Box, Image, Text } from '@chakra-ui/react'

const UserInfoBox = ({ user }) => {
    console.log('user2', user);

    return (
        <Flex direction="row" align="center">
            <Box
                boxSize="150px"
                rounded="full"
                overflow="hidden"
                mr={10}
            >
                <Image src={user.user.images.length === 0 ? '/images/image.png' : user.user.images[0].url} alt={user.user.display_name} />
            </Box>
            <Box>
                <Text fontSize="xl" fontWeight="bold">{user.user.display_name}</Text>
                <Text fontSize="md" color="gray.500">Followers: {user.user.followers.total}</Text>
                <Text fontSize="md" color="gray.500">User type: {user.user.type}</Text>
                <Text fontSize="md" color="gray.500">Spotify product: {user.user.product}</Text>
            </Box>
        </Flex>
    )
}

export default UserInfoBox;