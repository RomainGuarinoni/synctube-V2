import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Room } from '@synctube-v2/types';
import { useGetRoom } from '../../api/rooms';
import { Loader } from '../../components/shared/Loader';
import { useRoom } from '../../context/RoomContext';
import { authenticatedRoute } from '../../guard/authenticatedRoute';
import { useTranslation } from '../../hooks/useTranslation';

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string | undefined };

  const { joinRoom } = useRoom();

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

  return (
    <div className="text-zinc-200">
      <p>{room.name}</p>
    </div>
  );
};

export default authenticatedRoute(RoomPage);
