import { React } from "react";
import { Box, Flex, Heading, Image, Text, Button, Icon } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";

const AritstTopAlbum = (props) => {

    console.log(props.album);

    const handleClick = () => {
        let token = localStorage.getItem("accessToken");

        fetch(`http://127.0.0.1:8000/play?id=${props.album.album.id}&type=${props.album.album.album_type}&access_token=${token}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    };
    return (
        <Box p={1} w="100%">
            <Flex direction="row" align="center" justify="center">
                <Box width={100} height={100}>
                    <Image src={props.album.album.images[1].url} alt="test" />
                </Box>
                <Box ml={2} flex={1}>
                    <Heading as="h3" size="sm">{props.album.name}</Heading>
                    <Text>{props.album.name}</Text>
                    <Text>Tracks: {props.album.track_number}</Text>
                </Box>
                <Button onClick={handleClick} leftIcon={<Icon as={BsFillPlayFill} />}>
                    Play
                </Button>
            </Flex>
        </Box>
    );
}

export default AritstTopAlbum;