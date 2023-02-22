import { React, useContext, useEffect, useState } from 'react';
import { ChakraProvider, Box, Spinner, Text, Button } from '@chakra-ui/react';
import { UserContext } from './context';
import Navbar from './Components/NavBar';
import PlaylistBox from './Components/PlaylistBox';
import NewPlaylistModal from './Components/NewPlaylistModal';

const Playlists = () => {
  const { user, setUser, accessToken, setAccessToken } = useContext(UserContext);
  const [playlists, setPlaylists] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (!storedAccessToken) {
      setIsLoading(false);
      return;
    }

    setAccessToken(storedAccessToken);
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

  const removePlaylist = (playlist_id) => {
    if (playlists !== null) {
      let newItems = playlists.items.filter((item) => item.id !== playlist_id);
      setPlaylists({ ...playlists, items: newItems });
    }
  };


  if (!user || !accessToken || isLoading) {
    return (
      <ChakraProvider>
        <Box
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      {/* Navbar component to display user information */}
      <Navbar user={user} />

      {/* Create new playlist section */}
      <Box maxW="800px" mx="auto" borderRadius="lg" overflow="hidden" p="4">
        <Text fontSize="2xl" fontWeight="semibold" as="h1" lineHeight="tight" isTruncated>
          {user.user.display_name}'s Playlists
        </Text>

        <Box d="flex" mt="2" alignItems="center">
          {/* Text section explaining how to manage playlists */}
          <Box as="span" ml="2" color="gray.400" fontSize="sm">
            <Text>
              You currently have {playlists.items.length} playlists in your library. Here, you can easily manage your playlists by playing, removing, and managing tracks.
            </Text>
            <Text>
              To play a playlist, simply click on the play button next to the playlist name. You can remove a playlist from your library by clicking on the remove button.
            </Text>
          </Box>

          {/* Create new playlist button */}
          <Box as="span" ml="2" color="gray.400" fontSize="sm">
            {/* Title for create new playlist section */}
            <Text fontWeight="semibold" as="h2" fontSize="lg" mb="2">
              Create a New Playlist
            </Text>

            {/* Description of how to create a new playlist */}
            <Text>
              To create a new playlist, simply click the button below. You'll be taken to Spotify's playlist creation page, where you can give your playlist a name and start adding tracks.
            </Text>

            {/* Create new playlist button */}
            <Button colorScheme="blue" mt="4" onClick={() => setIsModalOpen(true)}>
              Create New Playlist
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Display existing playlists */}
      <Box maxW="800px" mx="auto" border="1px solid gray" borderRadius="lg" overflow="hidden">
        {playlists?.items?.map((playlist) => (
          <PlaylistBox key={playlist.id} removePlaylist={removePlaylist} imageSrc={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : ''} playlistName={playlist.name} playlistId={playlist.id} />
        ))}
      </Box>

      {/* New playlist modal */}
      <NewPlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </ChakraProvider>
  );
};

export default Playlists;
