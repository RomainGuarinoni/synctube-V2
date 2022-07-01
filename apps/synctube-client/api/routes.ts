export const routes = {
  videos: {
    favourite: '/api/favourite',
    history: '/api/history',
    youtube: 'https://www.googleapis.com/youtube/v3/search',
  },
  user: {
    login: '/api/user/login',
  },
  rooms: {
    getUserRoomsOwner: (userId: string) => `/api/room/user/${userId}/owner`,
    getUserRoomsVisited: (userId: string) => `/api/room/user/${userId}/visited`,
    createRoom: '/api/room/create',
    deleteRoom: (roomId: string) => `/api/room/${roomId}`,
    modifyRoom: (roomId: string) => `/api/room/${roomId}`,
  },
};
