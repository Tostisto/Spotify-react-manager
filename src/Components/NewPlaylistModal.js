import { useState } from 'react';
import { Box, Button, Icon } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/react';
import { ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

const NewPlaylistModal = ({ isOpen, onClose }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [playlistImageUrl, setPlaylistImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handlePlaylistNameChange = (event) => {
        setPlaylistName(event.target.value);
    };

    const handlePlaylistDescriptionChange = (event) => {
        setPlaylistDescription(event.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setPlaylistImageUrl(URL.createObjectURL(file));
        }
    };

    const createPlaylist = () => {
        let access_token = localStorage.getItem('accessToken');

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', playlistName);
        formData.append('description', playlistDescription);
        formData.append('access_token', access_token);

        fetch('http://127.0.0.1:8000/create_playlist', {
            method: 'POST',
            body: formData,

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create playlist');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleCreatePlaylist = () => {
        createPlaylist();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb="4" display="flex" flexDirection="row" alignItems="center">
                        <Box mb="4" display="flex" flexDirection="row" alignItems="center">
                            {imageFile ? (
                                <Box
                                    w="100px"
                                    h="100px"
                                    borderRadius="md"
                                    bgImage={`url(${URL.createObjectURL(imageFile)})`}
                                    bgSize="cover"
                                    mr="4"
                                />
                            ) : (
                                <Box as="label" htmlFor="playlist-image-upload" mr="4">
                                    <Box
                                        w="100px"
                                        h="100px"
                                        borderRadius="md"
                                        backgroundColor="gray.800"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        cursor="pointer"
                                        overflow="hidden"
                                        _hover={{ backgroundColor: 'gray.900' }}
                                    >
                                        <Icon as={FiUpload} fontSize="xl" />
                                        <Input
                                            type="file"
                                            id="playlist-image-upload"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            display="none"
                                        />
                                    </Box>
                                </Box>
                            )}
                            <Box flex="1">
                                <FormControl id="playlist-name" mb="4">
                                    <FormLabel>Playlist Name</FormLabel>
                                    <Input type="text" value={playlistName} onChange={handlePlaylistNameChange} />
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>


                    <FormControl id="playlist-description" mb="4">
                        <FormLabel>Playlist Description</FormLabel>
                        <Textarea value={playlistDescription} onChange={handlePlaylistDescriptionChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr="2" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleCreatePlaylist}>
                        Create Playlist
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NewPlaylistModal;
