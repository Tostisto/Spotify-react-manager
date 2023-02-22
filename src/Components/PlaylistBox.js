import { useState } from "react";
import { Box, Flex, Image, Text, Button, IconButton, Skeleton } from "@chakra-ui/react";
import PlaylistModal from "./PlaylistModal";
import { FaPlay, FaTrash } from "react-icons/fa";

function PlaylistBox({ imageSrc, removePlaylist, playlistName, playlistId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayButtonClick = () => {
    console.log("Play button clicked");
    let token = localStorage.getItem("accessToken");
    fetch(`http://127.0.0.1:8000/play?id=${playlistId}&type=playlist&access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  const handleDelete = () => {
    let token = localStorage.getItem("accessToken");
    fetch(`http://127.0.0.1:8000/remove_playlist?access_token=${token}&id=${playlistId}`)
      .then(response => response.json())
      .then(data => {
        if (data.status == 'ok') {
          removePlaylist(playlistId)
        }
      }
      );
  }

  const handlePlaylistModal = (event) => {
    if ((event.target.className && event.target.className.includes('playPlaylist')) || (event.target.className && event.target.className.includes('removePlaylist'))) {
      console.log("Clicked on button");
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        w="100%"
        p={4}
        borderRadius="lg"
        overflow="hidden"
        transition="background-color 0.3s ease, cursor 0.3s ease"
        _hover={{ cursor: "pointer" }}
        onClick={handlePlaylistModal}
      >
        <Flex alignItems="center">
          <Box w="10%" mr={4}>
            {imageSrc ? (
              <Image src={imageSrc} alt={playlistName} />
            ) : (
              <Skeleton w="100%" h={20} />
            )}
          </Box>

          <Box w="60%" textAlign="left">
            <Text fontWeight="semibold" fontSize="lg" mb={2}>
              {playlistName ? (
                playlistName
              ) : (
                <Skeleton w="80%" h={6} />
              )}
            </Text>
          </Box>

          <Box w="30%" textAlign="right">
            <IconButton
              className="removePlaylist"
              icon={<FaTrash />}
              colorScheme="red"
              mr={2}
              onClick={handleDelete}
            />
            <IconButton
              className="playPlaylist"
              icon={<FaPlay />}
              colorScheme="blue"
              onClick={handlePlayButtonClick}
            />
          </Box>
        </Flex>
      </Box>

      <PlaylistModal isOpen={isModalOpen} onClose={handleCloseModal} playlistId={playlistId} />
    </>
  );
}

export default PlaylistBox;
