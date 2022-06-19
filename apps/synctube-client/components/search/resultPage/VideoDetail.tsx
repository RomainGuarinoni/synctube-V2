import { Video } from '@synctube-v2/types';
import Image from 'next/image';
import React, { MouseEvent as MouseEventReact } from 'react';
import { toast } from 'react-toastify';

import { Button } from '../../shared/Button';
import { IHearth } from '../../icons/IHearth';
import { IPlay } from '../../icons/IPlay';
import { useAuth } from '../../../context/AuthContext';
import { addFavouriteVideo } from '../../../api/favourite';
import { useTranslation } from '../../../hooks/useTranslation';

interface VideoProps {
  video: Video;
}
const Component: React.FC<VideoProps> = ({
  video: { id, title, description, channelTitle, picture, publishedAt },
}) => {
  const {
    authState: { profil },
  } = useAuth();

  const {
    videoDetail: { description: descriptionText, watch, favourite },
    toast: { videoAddedToFavourite },
  } = useTranslation();

  const decodeHtml = (text: string) => {
    const htmlText = document.createElement('textarea');
    htmlText.innerHTML = text;
    return htmlText.value;
  };

  const playVideo = (e: MouseEventReact<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    console.log(`Play the video : ${title}`);
  };

  const setVideoToFavourite = async (
    e: MouseEventReact<HTMLElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    if (profil) {
      try {
        await addFavouriteVideo(profil.id, {
          id,
          title,
          description,
          channelTitle,
          picture,
          publishedAt,
        });
        toast.success(videoAddedToFavourite);
      } catch (err) {
        console.log(err);
        //ADD TOAST HERE
      }
    }
  };

  return (
    <div
      className="h-[28rem] w-80 bg-zinc-800 cursor-pointer hover:scale-105 ease-linear duration-100 rounded-lg overflow-hidden flex flex-col text-zinc-200"
      onClick={playVideo}
    >
      <div className="w-full h-1/2 relative image">
        <Image
          src={picture}
          alt="Youtube thumbnail"
          title={`Youtube thumbnail for the video ${title}`}
          objectFit="cover"
          layout="fill"
          className="scale-[1.24]"
        />
      </div>
      <div className="flex-1 w-full px-2 flex flex-col">
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
          <h4>{descriptionText} </h4>
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
              {watch}
            </div>
          </Button>
          <Button size="medium" onClick={setVideoToFavourite}>
            <div className="flex flex-wrap items-center justify-start">
              <span className="w-4 mr-1">
                <IHearth />
              </span>
              {favourite}
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

        .image {
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1),
            rgb(0, 0, 0, 0)
          );
        }
      `}</style>
    </div>
  );
};

export const VideoDetail = React.memo(
  Component,
  ({ video: preVideo }, { video: actVideo }) =>
    preVideo.title === actVideo.title &&
    preVideo.description === actVideo.description &&
    preVideo.id === actVideo.id &&
    preVideo.channelTitle === actVideo.channelTitle &&
    preVideo.picture === actVideo.picture &&
    preVideo.publishedAt === actVideo.publishedAt,
);
