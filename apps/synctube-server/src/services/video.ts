import { Video, Paginate } from '@synctube-v2/types';
import { FavouriteModel, IFavouriteSchema } from '../schemas/Favourite';

export function getRoomHistoryVideo(roomId: string): Video[] {
  return;
}

export async function getUserFavouriteVideos(
  userId: string,
  limit: number,
  pageToken?: string,
): Promise<Paginate<Video>> {
  const favouriteVideos = await FavouriteModel.find({
    userId,
    ...(pageToken ? { _id: { $gt: pageToken } } : {}),
  }).limit(limit);

  console.log('pass there hehe');

  const paginateReponse: Paginate<Video> = {
    items: favouriteVideos.map((item) => item.video),
    pageInfo: {
      resultsPerPage: limit,
      totalResults: 500,
    },
    ...(favouriteVideos.length === limit
      ? { nextPageToken: favouriteVideos[limit - 1]._id.toString() }
      : {}),
    ...(pageToken
      ? { previousPageToken: favouriteVideos[0]._id.toString() }
      : {}),
  };

  console.log('mais wtf quoi');

  console.log(paginateReponse);

  return paginateReponse;
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
