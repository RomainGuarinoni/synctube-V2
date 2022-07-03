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
import { useSocket } from '../../context/SocketContext';

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string | undefined };

  const { joinRoom, isUserInRoom } = useRoom();

  const { joinRoom: joinRoomSocket } = useSocket();
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

    try {
      console.log(room);
      joinRoomFunc(room);
      joinRoomSocket(room._id);
    } catch (err) {
      console.log(err);
      toast.error(internal);
      router.push('/');
    }

    setLoading(false);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [room]);

  useEffect(() => {
    if (isError) {
      console.log(isError);
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

  return (
    <div className="text-zinc-200 flex justify-between">
      <p>{room.name}</p>
      <ConnectedUsers />
    </div>
  );
};

export default authenticatedRoute(RoomPage);
