import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Box, Flex, Image, Text } from "@chakra-ui/react";
import TrackBox from "./TrackBox";

const PlaylistModal = ({ isOpen, onClose, playlistId }) => {
  const [artist, setArtist] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      let accessToken = localStorage.getItem("accessToken");

      fetch(`http://127.0.0.1:8000/playlist_tracks?id=${playlistId}&access_token=${accessToken}`)
        .then((res) => res.json())
        .then((data) => {
          setArtist(data);
          setIsLoading(false);
          console.log("Artist:", data.items);
        });
    }
  }, [isOpen]);

  const removeTrack = (track_id) => {
    let newItems = artist.items.filter((item) => item.track.id !== track_id);
    setArtist({ ...artist, items: newItems });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <Box p={5}>
              {artist.items.map((track) => (
                <TrackBox key={track.track.id} removeTrack={removeTrack} imageSrc={track.track.album.images[0].url} trackName={track.track.name} artists={track.track.artists} track_id={track.track.id} playlist_id={playlistId} />
              ))}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlaylistModal;
