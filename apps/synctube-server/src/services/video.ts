import { Video } from '@synctube-v2/types';

const MockData: Video[] = [
  {
    id: '454',
    title: 'Nouvelle video',
    description: "c'est une nouvelle vidéo",
    picture: 'https://video.com',
    channelTitle: 'Romain Guar',
    owner: 'Romauin Guarinoni',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '541',
    title: 'Je dois vous parler',
    description: "c'est compliquer en ce moment",
    picture: 'https://video.com',
    channelTitle: 'panash',
    owner: 'Alexandre garcia',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '874',
    title: 'bonsoir a tous',
    description: "de la musique que l'on aime",
    picture: 'https://video.com',
    channelTitle: 'Romain Guar',
    owner: 'Alexandre garcia',
    publishedAt: new Date().toISOString(),
  },
];

export function getRoomHistoryVideo(roomId: string): Video[] {
  return MockData;
}

export function getUserFavouriteVideo(userId: string): Video[] {
  return MockData;
}
