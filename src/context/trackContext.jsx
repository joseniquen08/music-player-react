import { createContext, useContext, useEffect, useState } from 'react';

const TrackContext = createContext([]);

export const useTrackContext = () => useContext(TrackContext);

const TrackContextProvider = ({ children }) => {

  const [currentSong, setCurrentSong] = useState(null);
  const [urlTracklist, setUrlTracklist] = useState(null);
  const [songReady, setSongReady] = useState(false);
  const [indexTracklist, setIndexTracklist] = useState(1);
  const [tracklist, setTracklist] = useState([]);

  useEffect(() => {
    fetch('https://api.deezer.com/track/1594959971')
    .then(response => response.json())
    .then(song => setCurrentSong({song, autoplay: false}));
  }, []);

  const skipSong = (idSong) => {
    fetch(`https://api.deezer.com/track/${idSong}`)
      .then(response => response.json())
      .then(song => {
        setCurrentSong({song, autoplay: true});
      });
  }

  const selectSong = (idSong) => {
    setSongReady(false);
    fetch(`https://api.deezer.com/track/${idSong}`)
      .then(response => response.json())
      .then(song => {
        setCurrentSong({song, autoplay: true});
        setUrlTracklist(song.album.tracklist);
        setSongReady(true);
      });
    fetch(urlTracklist)
      .then(response => response.json())
      .then(tracklist => setTracklist(tracklist.data));
  }

  const changeIndexTracklist = () => {
    setIndexTracklist(indexTracklist + 1);
  }

  return (
    <TrackContext.Provider value={{
      currentSong, selectSong, tracklist, skipSong, indexTracklist, changeIndexTracklist, songReady
    }}>
      {children}
    </TrackContext.Provider>
  );
}

export default TrackContextProvider;