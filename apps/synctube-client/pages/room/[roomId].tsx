import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Room } from '@synctube-v2/types';
import { useGetRoom } from '../../api/rooms';
import { Loader } from '../../components/shared/Loader';
import { useRoom } from '../../context/RoomContext';
import { authenticatedRoute } from '../../guard/authenticatedRoute';
import { useTranslation } from '../../hooks/useTranslation';
import { ConnectedUsers } from '../../components/room/misc/ConnectedUsers';

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string | undefined };

  const { joinRoom, isUserInRoom } = useRoom();

  const { data: room, isError } = useGetRoom(roomId);

  const {
    errors: { internal },
  } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinRoomFunc = async (room: Room) => {
      await joinRoom(room);
    };

    if (!room) return;

    if (isUserInRoom()) {
      setLoading(false);
      return;
    }

    joinRoomFunc(room);

    setLoading(false);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [room]);

  useEffect(() => {
    if (isError) {
      toast.error(internal);
      router.push('/');
    }
  }, [isError, internal, router]);

  if (loading || !room) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const users = [
    {
      familyName: 'guarsdsdsdsdsd',
      givenName: 'romainsdsdsdsd',
      id: '11250414398618523928',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjzHt6YqwS7qVvGQDPVRBH_ag0APE_TvWKqs3tT=s96-c',
      resgisteredAt: '2022-06-11T18:48:45.364Z',
    },
    {
      id: 'ad',
      familyName: 'Romain',
      givenName: 'Guarinoni',
      picture:
        'https://lh3.googleusercontent.com/a/AATXAJwIHMQ0mFzClcx1DhYcGf4l6xdW7fl7uB-v2E2S=s96-c',
      resgisteredAt: { $date: { $numberLong: '1655924928060' } },
    },
    {
      familyName: 'guar',
      givenName: 'romain',
      id: 'zdzd',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjzHt6YqwS7qVvGQDPVRBH_ag0APE_TvWKqs3tT=s96-c',
      resgisteredAt: '2022-06-11T18:48:45.364Z',
    },
    {
      id: '1sdsd',
      familyName: 'Romain',
      givenName: 'Guarinoni',
      picture:
        'https://lh3.googleusercontent.com/a/AATXAJwIHMQ0mFzClcx1DhYcGf4l6xdW7fl7uB-v2E2S=s96-c',
      resgisteredAt: { $date: { $numberLong: '1655924928060' } },
    },
    {
      familyName: 'guarsdsdszzzzee',
      givenName: 'romainsdsdsdsd',
      id: 'sdfqsffsdg',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjzHt6YqwS7qVvGQDPVRBH_ag0APE_TvWKqs3tT=s96-c',
      resgisteredAt: '2022-06-11T18:48:45.364Z',
    },

    {
      id: '1sdsd',
      familyName: 'Garcia',
      givenName: 'Alexandre',
      picture:
        'https://lh3.googleusercontent.com/a/AATXAJwIHMQ0mFzClcx1DhYcGf4l6xdW7fl7uB-v2E2S=s96-c',
      resgisteredAt: { $date: { $numberLong: '1655924928060' } },
    },
  ];

  return (
    <div className="text-zinc-200 flex justify-between">
      <p>{room.name}</p>
      <ConnectedUsers users={users} />
    </div>
  );
};

export default authenticatedRoute(RoomPage);
