import { Video } from '@synctube-v2/types';
import React from 'react';
import { VideoDetail } from './VideoDetail';

interface VideosListProps {
  video: Video[];
}

export const VideosList: React.FC<VideosListProps> = ({ video }) => {
  return (
    <div className="w-full h-full flex flex-wrap items-center justify-start gap-10">
      {video.map((video) => (
        <VideoDetail key={video.id} video={video} />
      ))}
    </div>
  );
};
