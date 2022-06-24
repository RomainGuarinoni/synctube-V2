import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { CreateRoomModal } from '../components/room/CreateRoomModal';
import { RoomDescription } from '../components/room/RoomDescription';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import { useGetUserRoomsOwner, useGetUserRoomsVisited } from '../api/rooms';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { RoomList } from '../components/room/RoomList';
import { Button } from '../components/shared/Button';

function Index(): JSX.Element {
  const {
    authState: { profil },
  } = useAuth();

  const {
    room: { selectPage },
  } = useTranslation();

  const {
    data: userRoomsOwner,
    isError: userRoomsErrorOwner,
    isValidating: userRoomsValidatingOwner,
  } = useGetUserRoomsOwner(profil?.id);
  const {
    data: userRoomsVisited,
    isError: userRoomsErrorVisited,
    isValidating: userRoomsValidatingVisited,
  } = useGetUserRoomsVisited(profil?.id);

  const [isRoomCreateModalOpen, setIsRoomCreateModalOpen] = useState(false);

  const handleCreateRoomOpen = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    setIsRoomCreateModalOpen(true);
  };

  return (
    <div className="text-zinc-200 flex flex-col w-full h-full items-center justify-start">
      <h2 className="text-2xl font-bold text-red-500 mb-10">
        {selectPage.title}
      </h2>

      <div className="flex flex-1 lg:h-[30rem] flex-wrap w-full justify-around items-start">
        <div className="flex flex-col gap-5">
          <RoomList
            title={selectPage.owner}
            rooms={userRoomsOwner}
            error={userRoomsErrorOwner}
          />
          <Button size="large" onClick={handleCreateRoomOpen}>
            Ajouter une salle
          </Button>
        </div>
        <RoomList
          title={selectPage.visited}
          rooms={userRoomsVisited}
          error={userRoomsErrorVisited}
        />
      </div>

      {isRoomCreateModalOpen && (
        <CreateRoomModal onClose={() => setIsRoomCreateModalOpen(false)} />
      )}
    </div>
  );
}

export default authenticatedRoute(Index);
