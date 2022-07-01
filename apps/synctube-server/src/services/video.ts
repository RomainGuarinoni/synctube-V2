import { Video, Paginate } from '@synctube-v2/types';
import { FavouriteModel, IFavouriteSchema } from '../models/Favourite';

export class VideoService {
  static async getUserFavouriteVideos(
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
              { 'video.title': { $regex: searchInput, $options: 'i' } },
              { 'video.description': { $regex: searchInput, $options: 'i' } },
              { 'video.channelTitle': { $regex: searchInput, $options: 'i' } },
            ],
          }
        : {}),
    }).limit(limit);

    const total = await FavouriteModel.find({
      userId,
      ...(searchInput
        ? {
            $or: [
              { 'video.title': { $regex: searchInput, $options: 'i' } },
              { 'video.description': { $regex: searchInput, $options: 'i' } },
              { 'video.channelTitle': { $regex: searchInput, $options: 'i' } },
            ],
          }
        : {}),
    }).count();

    return {
      items: favouriteVideos.map((item) => item.video),
      pageInfo: {
        resultsPerPage: limit,
        totalResults: total,
        count: favouriteVideos.length,
      },
      ...(favouriteVideos.length
        ? {
            nextPageToken:
              favouriteVideos[favouriteVideos.length - 1]._id.toString(),
          }
        : {}),
    };
  }

  static async getUserFavouriteVideoById(
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

  static async addUserFavouriteVideo(video: IFavouriteSchema): Promise<void> {
    const favouriteVideo = new FavouriteModel(video);

    await favouriteVideo.save();
  }

  static async getRoomHistoryVideo(roomId: string): Promise<Video[]> {
    return [];
  }
}
