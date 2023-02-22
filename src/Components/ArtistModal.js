import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Flex, Image, Text, Skeleton } from "@chakra-ui/react";
import AritstTopAlbum from "./AritstTopAlbum";

const ArtistModal = ({ isOpen, onClose, artistId }) => {
  const [artist, setArtist] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      async function fetchData() {

        let token = localStorage.getItem('accessToken');

        await fetch(`http://127.0.0.1:8000/artist?id=${artistId}&access_token=${token}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setArtist(data);
            setIsLoading(false);
          }
          )
          .catch((error) => {
            console.error("Error:", error);
          }
          );
      }
      fetchData();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Box p={5}>
              <Flex align="center">
                <Skeleton height={200} width={200} mr={5} />
                <Box>
                  <Skeleton height={6} width={120} mb={2} />
                  <Skeleton height={4} width={100} mb={1} />
                  <Skeleton height={4} width={100} mb={1} />
                  <Skeleton height={4} width={150} mb={1} />
                </Box>
              </Flex>
              <Skeleton height={6} mt={5} mb={5} />
              <Skeleton height={6} width="100%" mb={5} />
              <Skeleton height={6} width="100%" mb={5} />
              <Skeleton height={6} width="100%" mb={5} />
              <Skeleton height={6} width="100%" mb={5} />
            </Box>
          ) : (
            <Box p={5}>
              <Flex align="center">
                <Image
                  src={artist.artist.images[2].url}
                  alt={artist.artist.name}
                  mr={5}
                />
                <Box>
                  <Text fontWeight="bold" size={30}>{artist.artist.name}</Text>
                  <Text fontSize="sm">Popularity: {artist.artist.popularity}</Text>
                  <Text fontSize="sm">Followers: {artist.artist.followers.total}</Text>
                  <Text fontSize="sm">Genres: {artist.artist.genres.join(", ")}</Text>
                </Box>
              </Flex>
              <Text mt={5}>{artist.bio}</Text>
              <Box mt={5}>
                {artist.top_tracks.tracks.map((album) => (
                  <AritstTopAlbum key={album.id} album={album} />
                ))}
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ArtistModal;
