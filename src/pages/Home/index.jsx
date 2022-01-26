import { faDeezer } from '@fortawesome/free-brands-svg-icons';
import { MusicWidget } from '../../components/MusicWidget';
import { Search } from '../../components/Search';
import { Icon } from '../../components/Stateless/Icon';
import { useTrackContext } from '../../context/trackContext';

export const Home = () => {

  const { currentSong, tracklist, indexTracklist, prevIndexTracklist, nextIndexTracklist, skipSong, statusSong } = useTrackContext();

  return (
    <div className="min-h-screen py-10 text-white bg-stone-900 font-inter">
      <div className="flex flex-col items-center h-full mx-auto space-y-9 max-w-7xl">
        <div className="flex flex-col items-center">
          <p className="py-1 text-5xl font-bold text-transparent cursor-default sm:text-6xl bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 bg-clip-text">Music Player</p>
        </div>
        <div className="w-full lg:flex lg:justify-center lg:space-x-4">
          <div className="flex flex-col items-center space-y-5">
            <p className="px-4 w-full lg:px-2 xs:max-w-[460px] md:w-[460px] text-center"><span className="mr-1.5 font-semibold text-pink-600">IMPORTANT!</span>Please, before starting, visit this page <a href="https://cors-anywhere.herokuapp.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline underline-offset-1">https://cors-anywhere.herokuapp.com/</a> and click on "Request tempory access to the demo server" and restart the page.</p>
            {
              currentSong && <MusicWidget
                                currentSong={currentSong}
                                indexTracklist={indexTracklist}
                                tracklist={tracklist}
                                prevIndexTracklist={prevIndexTracklist}
                                nextIndexTracklist={nextIndexTracklist}
                                skipSong={skipSong}
                                statusSong={statusSong}
                              />
            }
            <div className="flex flex-col items-center space-y-1">
              <p className="text-lg">You can only listen to 30 seconds of the song.</p>
              <p className="text-lg">Those are the API conditions :)</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-lg font-semibold">Powered by <a href="https://developers.deezer.com/api" target="_blank" rel="noreferrer"><span><Icon icon={faDeezer}/></span> deezer</a></p>
              <p className="text-lg font-semibold">Developed by <a href="http://joseniquen.me" target="_blank" rel="noreferrer">José Ñiquen</a></p>
            </div>
          </div>
          <Search />
        </div>
      </div>
    </div>
  );
};
