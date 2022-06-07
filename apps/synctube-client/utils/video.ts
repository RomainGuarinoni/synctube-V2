import { Video } from '@synctube-v2/types';
import { YoutubeResponse } from '../api/youtube';

export function convertYoutubeVideo(
  response: YoutubeResponse | undefined,
): Video[] | undefined {
  if (!response) return undefined;

  return response.items
    .filter(({ id: { kind } }) => kind !== 'youtube#channel')
    .map(
      ({
        id: { videoId },
        snippet: {
          title,
          description,
          channelTitle,
          publishedAt,
          thumbnails: {
            high: { url },
          },
        },
      }) => {
        return {
          title,
          id: videoId,
          description,
          channelTitle,
          publishedAt,
          picture: url,
        };
      },
    );
}
