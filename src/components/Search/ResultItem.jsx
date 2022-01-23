import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useTrackContext } from "../../context/trackContext";
import { Icon } from "../Stateless/Icon";
import { LoadingSearch } from "../Stateless/Loading/LoadingSearch";

export const ResultItem = ({ id, title, album, artist, image, duration }) => {

  const { selectSong, songReady } = useTrackContext();

  const [isLoadingSelectSong, setIsLoadingSelectSong] = useState(false);

  const clickSong = (id) => {
    selectSong(id);
    setIsLoadingSelectSong(true);
  }

  useEffect(() => {
    if (songReady) {
      setIsLoadingSelectSong(false)
    }
  }, [songReady]);

  const leadingZero = (time) => {
    return (time < 10) ? ('0' + time) : + time;
  }

  return (
    <li className="bg-stone-900 px-4 py-3 rounded-lg flex space-x-3.5 w-full max-w-3xl mx-auto justify-between">
      <div className="flex space-x-3.5 w-full">
        <button type="button" onClick={() => clickSong(id)}className="relative flex-none overflow-hidden bg-stone-900">
          <img src={image} alt="" width="70" height="70" className="flex-none rounded-lg"/>
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/30">
            {
              isLoadingSelectSong && !songReady ? (
                <LoadingSearch />
              ) : (
                <Icon icon={faPlay} className="text-2xl"/>
              )
            }
          </div>
        </button>
        <div className="flex grow flex-col w-0 min-w-0 justify-between py-0.5">
          <div className="min-w-0">
            <p className="text-xs text-pink-400 truncate">{album}</p>
            <p className="text-lg truncate">{title}</p>
            <p className="text-sm text-stone-500 -mt-0.5 truncate">{artist}</p>
          </div>
        </div>
      </div>
      <div className="flex-none px-1.5">
        <div className="flex space-x-1.5 items-center">
          <Icon icon={faClock} className="text-lg pt-0.5"/>
          <p className="text-base">{`${leadingZero(duration % 60 === duration ? 0 : Math.trunc(duration / 60))}:${leadingZero(duration % 60)}`}</p>
        </div>
      </div>
    </li>
  );
};
