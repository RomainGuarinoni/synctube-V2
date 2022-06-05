import { Video } from '@synctube-v2/types';
import { YoutubeResponse } from '../api/youtube';

export function convertYoutubeVideo(
  response: YoutubeResponse | undefined,
): Video[] | undefined {
  if (!response) return undefined;

  return response.items.map(
    ({ id, snippet: { title, description, channelTitle, thumbnails } }) => {
      return {
        id: id.videoId,
        title,
        description,
        channelTitle,
        picture: thumbnails.medium.url,
      };
    },
  );
}
