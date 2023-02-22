import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Box, Input, Flex } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchTrendingTracks = async () => {
      let token = localStorage.getItem('accessToken');

      await fetch(`http://127.0.0.1:8000/get_tranding?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
          setCards(data.albums.items.map((item) => ({
            title: item.name,
            image: item.images[0].url,
            artist: item.artists[0].name,
            artist_id: item.artists[0].id,
            type: item.type,
            id: item.id
          })));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    fetchTrendingTracks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm) return;

    let token = localStorage.getItem('accessToken');

    await fetch(`http://127.0.0.1:8000/search?type=album&query=${searchTerm}&limit=20&access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        setCards(data.albums.items.map((item) => ({
          title: item.name,
          image: item.images[0].url,
          artist: item.artists[0].name,
          artist_id: item.artists[0].id,
          album: item.name,
          type: item.type,
          id: item.id
        })));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={6} mx="auto" maxW="lg">
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          id="search"
          placeholder="Enter your search term"
        />
        <IconButton aria-label='Search database' icon={<SearchIcon />} type="submit" />

      </Flex>
      <Box display="flex" flexWrap="wrap" mt={4}>
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchForm;
