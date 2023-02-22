import { useState, useEffect } from "react";
import { Box, Flex, Image, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

function UserPlaylistModal({ isOpen, onClose, trackId }) {
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    console.log("track id:", trackId);
  }, []);

  const handleAddToPlaylist = (playlistId) => {
    // add logic for adding to playlist
    console.log(`Added to playlist ${playlistId}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} trackId={trackId}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {userPlaylists.map((playlist) => (
            <Flex key={playlist.id} alignItems="center" my={2}>
              <Image src={playlist.icon} alt={playlist.name} boxSize="50px" objectFit="cover" mr={4} />
              <Box>
                <Text fontWeight="bold">{playlist.name}</Text>
                <Text color="gray.500">{playlist.description}</Text>
              </Box>
              <Button ml="auto" onClick={() => handleAddToPlaylist(playlist.id)}>Add to playlist</Button>
            </Flex>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserPlaylistModal;