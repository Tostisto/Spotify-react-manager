import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { FaPlay, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context";

const TrackBox = ({ imageSrc, removeTrack, trackName, artists, track_id, playlist_id }) => {
  const { user, setUser, accessToken, setAccessToken } = useContext(UserContext);

  const handleDelete = () => {
    console.log("Delete button clicked");
    fetch(`http://127.0.0.1:8000/remove_playlist_track?access_token=${accessToken}&track_id=${track_id}&playlist_id=${playlist_id}`)
      .then(response => response.json())
      .then(data => {
        if (data.status == 'ok') {
          removeTrack(track_id);
        }
      }
      );
  }

  const handlePlay = () => {
    console.log("Play button clicked");
    fetch(`http://127.0.0.1:8000/play?id=${track_id}&type=track&access_token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }
      );
  }

  return (
    <Box
      w="100%"
      p={4}
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex alignItems="center">
        <Box w="20%" mr={4}>
          <Image src={imageSrc} alt={trackName} />
        </Box>

        <Box w="60%" textAlign="left">
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            {trackName}
          </Text>

          <Text fontSize="md" mb={2}>
            {artists.map((artist) => (
              <span key={artist.id}>{artist.name} </span>
            ))
            }
          </Text>
        </Box>

        <Box w="20%" textAlign="right" display="flex">
          <IconButton icon={<FaTrash />} colorScheme="red" mr={2} onClick={handleDelete} />
          <IconButton icon={<FaPlay />} colorScheme="blue" onClick={handlePlay} />
        </Box>
      </Flex>
    </Box>
  );
}

export default TrackBox;