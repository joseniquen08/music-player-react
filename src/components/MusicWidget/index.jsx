import { faPause, faPlay, faStepBackward, faStepForward, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Icon } from "../Stateless/Icon";

export const MusicWidget = ({ currentSong, tracklist }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();
  const volumeRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();

  const onLoadedMetadata = () => {
    const seconds = Math.round(audioRef.current.duration);
    setDuration(seconds);
    progressBarRef.current.max = audioRef.current.duration;
    if (currentSong.autoplay) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      setIsPlaying(true);
    }
  };

  const tooglePToP = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBarRef.current.value = audioRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (audioRef.current.ended){
      setIsPlaying(false);
      return;
    }
  }

  const changeRange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  }

  const changeVolume = () => {
    audioRef.current.volume = volumeRef.current.value;
    volumeRef.current.style.setProperty('--seek-before-width', `${volumeRef.current.value * 100}%`);
  }

  const changePlayerCurrentTime = () => {
    setCurrentTime(Math.round(progressBarRef.current.value));
    progressBarRef.current.style.setProperty('--seek-before-width', `${progressBarRef.current.value / progressBarRef.current.max * 100}%`);
  }

  const leadingZero = (time) => {
    return (time < 10) ? ('0' + time) : + time;
  }

  return (
    <div className="px-4 w-full lg:px-2 xs:max-w-[460px] md:w-[460px]">
      <div className="px-6 py-5 space-y-6 border-b bg-stone-800 border-stone-500 rounded-t-xl ">
        <div className="flex items-start space-x-4">
          <img src={currentSong && currentSong.song.album.cover_medium} alt="" width="105" height="105" className="flex-none rounded-lg bg-slate-100"/>
          <div className="flex flex-col justify-end min-w-0 space-y-1 font-semibold">
            <p className="text-xs text-pink-400 truncate">
              {currentSong && currentSong.song.album.title}
            </p>
            <h2 className="text-sm truncate text-stone-400">
              {currentSong && currentSong.song.contributors.map((artist, index) => {
                if (index !== currentSong.song.contributors.length - 1) {
                  return artist.name + ", "
                }
                return artist.name
              })}
            </h2>
            <p className="text-lg text-slate-50">
              {currentSong && currentSong.song.title}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <audio ref={audioRef} src={currentSong.song.preview} preload="metadata" onLoadedMetadata={onLoadedMetadata} />
            <input ref={progressBarRef} onChange={changeRange} type="range" min="0" max="100" step="0.01" defaultValue="0" className="progress-bar-audio"/>
          </div>
          <div className="flex justify-between text-sm font-medium leading-6 tabular-nums">
            <div className="text-slate-100">{`${leadingZero(currentTime % 60 === currentTime ? 0 : Math.trunc(currentTime / 60))}:${leadingZero(currentTime % 60)}`}</div>
            <div className="text-slate-100">{(duration && !isNaN(duration)) && (`${leadingZero(duration % 60 === duration ? 0 : Math.trunc(duration / 60))}:${leadingZero(duration % 60)}`)}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 bg-stone-600 rounded-b-xl">
        <div className="flex items-center space-x-3">
          <button type="button" disabled={tracklist.length === 0 ? true : false} className="flex items-center justify-center rounded-full text-stone-200 disabled:text-stone-500 h-11 w-11 disabled:hover:bg-stone-600 hover:bg-stone-700/50">
            <Icon icon={faStepBackward} size={"lg"} />
          </button>
          <button onClick={() => tooglePToP()} type="button" className="flex items-center justify-center flex-none mx-auto my-2.5 rounded-full shadow-md w-11 h-11 bg-slate-100 text-pink-600 ring-1 ring-slate-900/5" aria-label="Pause">
            {
              !isPlaying ? (
                <Icon icon={faPlay} className="pl-1 text-2xl" />
                ) : (
                  <Icon icon={faPause} className="text-2xl"/>
                )
            }
          </button>
          <button type="button" disabled={tracklist.length === 0 ? true : false} className="flex items-center justify-center rounded-full text-stone-200 disabled:text-stone-500 h-11 w-11 disabled:hover:bg-stone-600 hover:bg-stone-700/50">
            <Icon icon={faStepForward} size={"lg"} />
          </button>
        </div>
        <div className="flex items-center space-x-2.5">
          <Icon icon={faVolumeMute}/>
          <input ref={volumeRef} onChange={changeVolume} type="range" className="w-24 progress-bar-volume" min="0" max="1" step="0.01" defaultValue="100" />
          <Icon icon={faVolumeUp}/>
        </div>
      </div>
    </div>
  );
};
