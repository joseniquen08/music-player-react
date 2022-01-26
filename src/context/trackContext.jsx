import { createContext, useContext, useEffect, useState } from 'react';
import { endPoints } from '../utils/constants';

const TrackContext = createContext([]);

export const useTrackContext = () => useContext(TrackContext);

const TrackContextProvider = ({ children }) => {

  const URL_CORS = endPoints.URL_CORS_PROXY;
  const URL_API = endPoints.URL_API_DEEZER;

  const [currentSong, setCurrentSong] = useState(null);
  const [songReady, setSongReady] = useState(false);
  const [indexTracklist, setIndexTracklist] = useState(0);
  const [tracklist, setTracklist] = useState([]);
  const [statusSong, setStatusSong] = useState(1);
  const [showMessageError, setShowMessageError] = useState(true);

  useEffect(() => {
    fetch(`${URL_CORS}${URL_API}1594959971`)
    .then(response => response.json())
    .then(song => {
      setShowMessageError(false);
      setCurrentSong({song, autoplay: false});
      setStatusSong(1);
    })
    .catch(err => {
      if (err) {
        setShowMessageError(true);
      }
    });
  }, [URL_CORS, URL_API]);

  const skipSong = (idSong) => {
    fetch(`${URL_CORS}${URL_API}${idSong}`)
      .then(response => response.json())
      .then(song => {
        setCurrentSong({song, autoplay: true});
        setStatusSong(3);
      });
  }

  const selectSong = async (idSong) => {
    let urlTracklist = null;
    setSongReady(false);
    await fetch(`${URL_CORS}${URL_API}${idSong}`)
      .then(response => response.json())
      .then(song => {
        setIndexTracklist(0);
        setCurrentSong({song, autoplay: true});
        setStatusSong(2);
        urlTracklist = song.artist.tracklist;
      })
      .then(() => fetch(`${URL_CORS}${urlTracklist}`))
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
      songReady,
      statusSong,
      showMessageError
    }}>
      {children}
    </TrackContext.Provider>
  );
}

export default TrackContextProvider;