import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext();
const songs = [
  {
    id: 2,
    title: "Breaching",
    artist: "EchoBR",
    url: "/songs/Breaching.wav",
    duration: "3:45",
  },
  {
    id: 3,
    title: "Forgotten Memories",
    artist: "EchoBR",
    url: "/songs/Forgotten Memories.wav",
    duration: "3:12",
  },
  {
    id: 4,
    title: "Nothing You Really Want",
    artist: "EchoBR",
    url: "/songs/nothing you really want.wav",
    duration: "2:58",
  },
  {
    id: 5,
    title: "Glacier Blue",
    artist: "EchoBR",
    url: "/songs/Glacier Blue.wav",
    duration: "3:28",
  },
  {
    id: 6,
    title: "In Love",
    artist: "EchoBR",
    url: "/songs/In Love.wav",
    duration: "3:15",
  },
  {
    id: 7,
    title: "Lemon Balm",
    artist: "EchoBR",
    url: "/songs/Lemon Balm.wav",
    duration: "3:42",
  },
  {
    id: 8,
    title: "Momentary Bliss",
    artist: "EchoBR",
    url: "/songs/Momentary Bliss.wav",
    duration: "2:45",
  },
];

export const MusicProvider = ({ children }) => {
  const [allsongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const storedPlaylists = localStorage.getItem("musicPlayerPlaylists");
    if (storedPlaylists) {
      setPlaylists(JSON.parse(storedPlaylists));
    }
  }, [])

  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists))
    } else {
      localStorage.removeItem("musicPlayerPlaylists");
    }
  }, [playlists])


  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allsongs.length;
      setCurrentTrack(allsongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const prevIndex = prev === 0 ? allsongs.length - 1 : prev - 1;
      setCurrentTrack(allsongs[prevIndex]);
      return prevIndex;
    });
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    );
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      })
    );
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allsongs,
        handlePlaySong,
        currentTrackIndex,
        currentTrack,
        setCurrentTrack,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        isPlaying,
        play,
        pause,
        volume,
        setVolume,
        createPlaylist,
        playlists,
        addSongToPlaylist,
        deletePlaylist
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return contextValue;
};
