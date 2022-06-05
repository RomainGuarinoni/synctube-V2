import { Video } from '@synctube-v2/types';
import { useState } from 'react';
import { VideoDetail } from './VideoDetail';

interface VideosListProps {
  video: Video[];
}

export function VideosList({ video }: VideosListProps): JSX.Element {
  const [detailedVideoId, setDetailedVideoID] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-start gap-10">
      {video.map((video) => (
        <VideoDetail
          key={video.id}
          video={video}
          setDetailedVideoID={setDetailedVideoID}
          detailedVideoId={detailedVideoId}
        />
      ))}
    </div>
  );
}
