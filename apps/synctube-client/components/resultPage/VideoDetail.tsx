import { Video } from '@synctube-v2/types';

interface VideoProps {
  video: Video;
  setDetailedVideoID: (arg: string | null) => void;
  detailedVideoId: string | null;
}

export function VideoDetail({
  video: { id, title, description, channelTitle, picture, owner },
  setDetailedVideoID,
  detailedVideoId,
}: VideoProps): JSX.Element {
  const handleMoreDetailClick = () => {
    if (detailedVideoId === id) {
      setDetailedVideoID(null);
      return;
    }
    setDetailedVideoID(id);
  };

  return (
    <div
      className={`flex gap-2 flex-row items-center bg-zinc-800 rounded-xl w-[35rem]
      ${
        detailedVideoId === id ? 'h-96' : 'h-48'
      } px-5 text-zinc-400 py-3 cursor-pointer ease-linear duration-100 hover:scale-105 flex-wrap `}
      onClick={handleMoreDetailClick}
    >
      <div className="w-1/3 h-full flex items-center justify-center aspect-video  ">
        <img src={picture} alt="" />
      </div>
      <div className="flex-1 flex flex-col justify-start items-start h-full">
        <h3 className="font-bold"> {title} </h3>
        <p className="font-normal h-1/3 overflow-hidden">{description} </p>
      </div>
    </div>
  );
}
