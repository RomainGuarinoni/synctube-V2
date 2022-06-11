import { Video } from '@synctube-v2/types';
import { FavouriteModel, IFavouriteSchema } from '../schemas/Favourite';

export function getRoomHistoryVideo(roomId: string): Video[] {
  return;
}

export async function getUserFavouriteVideos(userId: string): Promise<Video[]> {
  const favouriteVideos = await FavouriteModel.find({ userId });

  // DO PAGINATION

  return favouriteVideos.map((video) => video.video);
}

export async function getUserFavouriteVideoById(
  userId: string,
  videoId: string,
): Promise<Video> {
  const favouriteVideo = await FavouriteModel.findOne({
    'video.id': videoId,
    userId,
  });

  if (!favouriteVideo) return null;

  return favouriteVideo.video;
}

export async function addUserFavouriteVideo(
  video: IFavouriteSchema,
): Promise<void> {
  const favouriteVideo = new FavouriteModel(video);

  await favouriteVideo.save();
}
