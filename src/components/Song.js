import React, { useEffect, useState, useRef, useCallback } from "react";
import "./styles/song.css";

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const audioRef = useRef(new Audio());

  const getSongData = async () => {
    try {
      const response = await fetch("/songs.json");
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();

      const initialSongs = data.map((song) => ({
        ...song,
        active: false,
      }));
      initialSongs[0].active = true;

      setSongs(initialSongs);
      setCurrentSong(initialSongs[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getSongData();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => console.error(error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const songEndHandler = () => {
    let currentIndex = songs.findIndex(
      (song) => song.title === currentSong.title
    );
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    setIsPlaying(true);
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex(
      (song) => song.title === currentSong.title
    );
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "skip-backward") {
      setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
    }
    setIsPlaying(true);
  };

  const stopSongHandler = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const playPauseHandler = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, [setIsPlaying]);

  const handleSearch = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // If there are filtered songs, set the current song to the first one
    if (filteredSongs.length > 0) {
      setCurrentSong(filteredSongs[0]);
    } else {
      // Handle the case when no matching songs are found
      setCurrentSong({});
    }
  }, [filteredSongs]);

  return (
    <div className="music-box">
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {filteredSongs.length > 0 ? (
        <div>
          <img
            className="album-cover"
            src={currentSong.image}
            alt="Album Cover"
          />
          <div className="song-details">
            <h3>{currentSong.title}</h3>
            <p>{currentSong.artist}</p>
          </div>

          <div className="controls">
            <button onClick={() => skipTrackHandler("skip-backward")} id="prev">
              Previous
            </button>
            <button onClick={stopSongHandler}>Stop</button>
            <button onClick={playPauseHandler}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={() => skipTrackHandler("skip-forward")} id="next">
              Next
            </button>
          </div>

          <audio
            ref={audioRef}
            src={currentSong.url}
            onEnded={songEndHandler}
          />
        </div>
      ) : (
        <p>No matching songs found.</p>
      )}
    </div>
  );
};

export default Song;
