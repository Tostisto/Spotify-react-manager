import React, { useEffect, useState } from "react";
import {
  IconButton, Box, Slider,
  SliderTrack, SliderFilledTrack,
  SliderThumb, SliderMark, Flex,
  Heading, Text, Button
} from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

const MusicControls = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);

  const handlePlay = () => {
    let token = localStorage.getItem("accessToken");

    fetch(`http://127.0.0.1:8000/play_paused?access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === "ok") {
          setIsPlaying(true)
        }
      });

    setIsPlaying(true)
  };

  const handlePause = () => {
    let token = localStorage.getItem("accessToken");

    fetch(`http://127.0.0.1:8000/pause?access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === "ok") {
          setIsPlaying(false)
        }
      });
  };

  const handleNext = () => {
    let token = localStorage.getItem("accessToken");
    fetch(`http://127.0.0.1:8000/next?access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }
      );
  };

  const handlePrevious = () => {
    let token = localStorage.getItem("accessToken");
    fetch(`http://127.0.0.1:8000/previous?access_token=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }
      );
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" position="sticky" bottom={0} bg="gray.700" p={3} width="100%" >
      <Flex>
        <IconButton
          aria-label="Previous Track"
          icon={<FaStepBackward />}
          onClick={handlePrevious}
        />
        {isPlaying ? (
          <IconButton
            aria-label="Pause"
            icon={<FaPause />}
            onClick={handlePause}
          />
        ) : (
          <IconButton
            aria-label="Play"
            icon={<FaPlay />}
            onClick={handlePlay}
          />
        )}
        <IconButton
          aria-label="Next Track"
          icon={<FaStepForward />}
          onClick={handleNext}
        />
      </Flex >
    </Box>


  );
};

export default MusicControls;
