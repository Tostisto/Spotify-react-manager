import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Image, Text, Button, Icon, Skeleton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import ArtistModal from './ArtistModal';

const Card = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    let token = localStorage.getItem("accessToken");

    fetch(`http://127.0.0.1:8000/play?id=${props.id}&type=${props.type}&access_token=${token}`)
      .then(response => response.json())
      .catch((error) => {
        console.error('Error:', error);
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Box p={1} w="100%">
      {isLoading ? (
        <Flex direction="row" align="center" justify="center">
          <Skeleton width={100} height={100} mr={2} />
          <Box flex={1}>
            <Skeleton height={6} mb={2} />
            <Skeleton height={6} mb={2} />
            <Skeleton height={6} mb={2} />
          </Box>
        </Flex>
      ) : (
        <Flex direction="row" align="center" justify="center">
          <Box width={100} height={100}>
            <Image src={props.image} alt={props.title} />
          </Box>
          <Box ml={2} flex={1}>
            <Heading as="h3" size="sm">{props.title}</Heading>
            <Text>{props.artist}</Text>
            <Text>{props.album}</Text>
            <Button onClick={() => handleOpenModal()}>Artist Info</Button>
            <ArtistModal isOpen={isModalOpen} onClose={handleCloseModal} artistId={props.artist_id} />
          </Box>
          <Button onClick={handleClick} leftIcon={<Icon as={BsFillPlayFill} />}>
            Play
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Card;