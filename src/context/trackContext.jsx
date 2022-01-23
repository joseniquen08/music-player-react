import { createContext, useContext, useEffect, useState } from 'react';

const TrackContext = createContext([]);

export const useTrackContext = () => useContext(TrackContext);

const TrackContextProvider = ({ children }) => {

  const [currentSong, setCurrentSong] = useState(null);
  const [songReady, setSongReady] = useState(false);
  const [indexTracklist, setIndexTracklist] = useState(0);
  const [tracklist, setTracklist] = useState([]);

  useEffect(() => {
    fetch('https://corsanywhere.herokuapp.com/https://api.deezer.com/track/1594959971')
    .then(response => response.json())
    .then(song => setCurrentSong({song, autoplay: false}));
  }, []);

  const skipSong = (idSong) => {
    fetch(`https://corsanywhere.herokuapp.com/https://api.deezer.com/track/${idSong}`)
      .then(response => response.json())
      .then(song => {
        setCurrentSong({song, autoplay: true});
      });
  }

  const selectSong = async (idSong) => {
    let urlTracklist = null;
    setSongReady(false);
    await fetch(`https://corsanywhere.herokuapp.com/https://api.deezer.com/track/${idSong}`)
      .then(response => response.json())
      .then(song => {
        setIndexTracklist(0);
        setCurrentSong({song, autoplay: true});
        urlTracklist = song.artist.tracklist;
        console.log(song);
      })
      .then(() => fetch(`https://corsanywhere.herokuapp.com/${urlTracklist}`))
      .then(response => response.json())
      .then(tracklist => {
        setTracklist(tracklist.data);
        console.log(tracklist.data);
        setSongReady(true);
      });
  }

  const prevIndexTracklist = () => {
    setIndexTracklist(indexTracklist - 1);
  }

  const nextIndexTracklist = () => {
    setIndexTracklist(indexTracklist + 1);
  }

  return (
    <TrackContext.Provider value={{
      currentSong,
      selectSong,
      tracklist,
      skipSong,
      indexTracklist,
      prevIndexTracklist,
      nextIndexTracklist,
      songReady
    }}>
      {children}
    </TrackContext.Provider>
  );
}

export default TrackContextProvider;