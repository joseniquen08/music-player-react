import { faDeezer } from '@fortawesome/free-brands-svg-icons';
import { MusicWidget } from '../../components/MusicWidget';
import { Search } from '../../components/Search';
import { Icon } from '../../components/Stateless/Icon';
import { useTrackContext } from '../../context/trackContext';

export const Home = () => {

  const { currentSong, tracklist } = useTrackContext();

  return (
    <div className="min-h-screen py-10 text-white bg-stone-900 font-inter">
      <div className="flex flex-col items-center h-full mx-auto space-y-9 max-w-7xl">
        <div className="flex flex-col items-center">
          <p className="py-1 text-6xl font-bold text-transparent cursor-default bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 bg-clip-text">Music Player</p>
        </div>
        <div className="w-full lg:flex lg:justify-center lg:space-x-4">
          <div className="flex flex-col items-center space-y-5">
            {
              currentSong && <MusicWidget currentSong={currentSong} tracklist={tracklist}/>
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
