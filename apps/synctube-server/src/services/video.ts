import { Video, Paginate } from '@synctube-v2/types';
import { FavouriteModel, IFavouriteSchema } from '../schemas/Favourite';

export function getRoomHistoryVideo(roomId: string): Video[] {
  return;
}

export async function getUserFavouriteVideos(
  userId: string,
  limit: number,
  pageToken?: string,
  searchInput?: string,
): Promise<Paginate<Video>> {
  const favouriteVideos = await FavouriteModel.find({
    userId,
    ...(pageToken ? { _id: { $gt: pageToken } } : {}),
    ...(searchInput
      ? {
          $or: [
            { 'video.title': { $regex: searchInput } },
            { 'video.description': { $regex: searchInput } },
            { 'video.channelTitle': { $regex: searchInput } },
          ],
        }
      : {}),
  }).limit(limit + 1);

  const total = await FavouriteModel.find({
    userId,
    ...(searchInput
      ? {
          $or: [
            { 'video.title': { $regex: searchInput } },
            { 'video.description': { $regex: searchInput } },
            { 'video.channelTitle': { $regex: searchInput } },
          ],
        }
      : {}),
  }).count();

  const hasMore = favouriteVideos.length == limit + 1;

  if (hasMore) {
    favouriteVideos.pop();
  }

  return {
    items: favouriteVideos.map((item) => item.video),
    pageInfo: {
      resultsPerPage: limit,
      totalResults: total,
    },
    ...(hasMore
      ? { nextPageToken: favouriteVideos[limit - 1]._id.toString() }
      : {}),
  };
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
