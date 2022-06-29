import { useState, MouseEvent as ReactMouseEvent } from 'react';
import { Room } from '@synctube-v2/types';
import { CreateRoomModal } from '../components/room/CreateRoomModal';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import { useGetUserRoomsOwner, useGetUserRoomsVisited } from '../api/rooms';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { RoomList } from '../components/room/RoomList';
import { Button } from '../components/shared/Button';
import { DeleteRoomModal } from '../components/room/DeleteRoomModal';

function Index(): JSX.Element {
  const {
    authState: { profil },
  } = useAuth();

  const {
    room: { selectPage },
  } = useTranslation();

  const { data: userRoomsOwner, isError: userRoomsErrorOwner } =
    useGetUserRoomsOwner(profil?.id);
  const { data: userRoomsVisited, isError: userRoomsErrorVisited } =
    useGetUserRoomsVisited(profil?.id);

  const [isRoomCreateModalOpen, setIsRoomCreateModalOpen] = useState(false);
  const [isRoomDeleteModalOpen, setIsRoomDeleteModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<Room>();

  const handleCreateRoomOpen = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    setIsRoomCreateModalOpen(true);
  };

  const handleRoomDelete =
    (room: Room) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setRoomToDelete(room);
      setIsRoomDeleteModalOpen(true);
    };

  return (
    <div className="text-zinc-200 flex flex-col w-full h-full items-center justify-start">
      <h2 className="text-2xl font-bold text-red-500 mb-10">
        {selectPage.title}
      </h2>

      <div className="flex flex-1 lg:h-[30rem] flex-wrap w-full justify-around items-start">
        <div className="flex flex-col gap-5 h-full ">
          <RoomList
            title={`${selectPage.owner} (5 max)`}
            rooms={userRoomsOwner}
            error={userRoomsErrorOwner}
            onDelete={handleRoomDelete}
          />
          {userRoomsOwner && userRoomsOwner?.length < 5 && (
            <Button size="large" onClick={handleCreateRoomOpen}>
              Ajouter une salle
            </Button>
          )}
        </div>

        {/* </div> */}
        <RoomList
          title={selectPage.visited}
          rooms={userRoomsVisited}
          error={userRoomsErrorVisited}
          onDelete={handleRoomDelete}
        />
      </div>

      {isRoomCreateModalOpen && (
        <CreateRoomModal onClose={() => setIsRoomCreateModalOpen(false)} />
      )}
      {isRoomDeleteModalOpen && roomToDelete && (
        <DeleteRoomModal
          room={roomToDelete}
          onClose={() => setIsRoomDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default authenticatedRoute(Index);
