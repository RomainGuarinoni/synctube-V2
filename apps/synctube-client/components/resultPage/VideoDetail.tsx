import { Video } from '@synctube-v2/types';
import Image from 'next/image';
import { MouseEvent as MouseEventReact } from 'react';

import { Button } from '../Button';
import { IHearth } from '../icons/IHearth';
import { IPlay } from '../icons/IPlay';

interface VideoProps {
  video: Video;
}

export function VideoDetail({
  video: { id, title, description, channelTitle, picture, owner, publishedAt },
}: VideoProps): JSX.Element {
  const decodeHtml = (text: string) => {
    const htmlText = document.createElement('textarea');
    htmlText.innerHTML = text;
    return htmlText.value;
  };

  const playVideo = (e: MouseEventReact<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log(`Play the video : ${title}`);
  };

  const setVideoToFavourite = (
    e: MouseEventReact<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    console.log(`New Favourite : ${title}`);
  };

  return (
    <div
      className="h-[28rem] w-80 bg-zinc-800 cursor-pointer hover:scale-105 ease-linear duration-100 rounded-lg overflow-hidden flex flex-col text-zinc-200"
      onClick={playVideo}
    >
      <div className="w-full h-1/2 relative">
        <Image
          src={picture}
          alt="Youtube thumbnail"
          title={`Youtube thumbnail for the video ${title}`}
          objectFit="cover"
          layout="fill"
          className="scale-[1.23]"
        />
      </div>
      <div className="flex-1 w-full p-2 flex flex-col">
        <div className="h-16 overflow-hidden">
          <h3 className="text-lg font-bold leading-none title">
            {decodeHtml(title)}
          </h3>
          <p className="text-zinc-400 text-sm mt-1 w-full">
            <span className="mr-2">{channelTitle}</span>
            <span className="mr-2">•</span>
            {new Date(publishedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-1">
          <h4>Description</h4>
          <p className="leading-none text-sm text-zinc-400 description h-14">
            {decodeHtml(description)}
          </p>
        </div>
        <div className="flex items-center justify-around flex-wrap flex-1 w-full">
          <Button size="medium" onClick={playVideo}>
            <div className="flex flex-wrap items-center justify-start">
              <span className="w-2 mr-1">
                <IPlay />
              </span>
              Regarder
            </div>
          </Button>
          <Button size="medium" onClick={setVideoToFavourite}>
            <div className="flex flex-wrap items-center justify-start">
              <span className="w-4 mr-1">
                <IHearth />
              </span>
              Favoris
            </div>
          </Button>
        </div>
      </div>
      <style jsx>{`
        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .description {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
