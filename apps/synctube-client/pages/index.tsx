import { useState, MouseEvent as ReactMouseEvent, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Room } from '@synctube-v2/types';
import { CreateRoomModal } from '../components/room/modal/CreateRoomModal';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import { useGetUserRoomsOwner, useGetUserRoomsVisited } from '../api/rooms';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { RoomList } from '../components/room/RoomList';
import { Button } from '../components/shared/Button';
import { DeleteRoomModal } from '../components/room/modal/DeleteRoomModal';
import { ModifyRoomModal } from '../components/room/modal/ModifyRoomModal';
import { MAX_RESULT } from '../api/config';

function Index(): JSX.Element {
  const {
    authState: { profil },
  } = useAuth();

  const {
    room: { selectPage },
  } = useTranslation();

  const { push } = useRouter();

  const [isRoomCreateModalOpen, setIsRoomCreateModalOpen] = useState(false);
  const [isRoomDeleteModalOpen, setIsRoomDeleteModalOpen] = useState(false);
  const [isRoomModifyModalOpen, setIsRoomModifyModalOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<Room>();

  const [searchRoomInput, setSearchRoomInput] = useState('');

  const { data: userRoomsOwner, isError: userRoomsErrorOwner } =
    useGetUserRoomsOwner(profil?.id);

  const {
    data: userRoomsVisited,
    isError: userRoomsErrorVisited,
    setSize,
    size,
    isValidating,
  } = useGetUserRoomsVisited(searchRoomInput);

  const reachedEndUserRoomsVisited = useMemo(() => {
    if (!userRoomsVisited) return false;

    return (
      userRoomsVisited[userRoomsVisited.length - 1].items.length != MAX_RESULT
    );
  }, [userRoomsVisited]);

  const handleRoomSelection = (room: Room) => () => {
    push(`room/${room._id}`);
  };

  const handleCreateRoomOpen = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    setIsRoomCreateModalOpen(true);
  };

  const handleRoomDelete =
    (room: Room) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setSelectedRoom(room);
      setIsRoomDeleteModalOpen(true);
    };

  const handleRoomModify =
    (room: Room) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setSelectedRoom(room);
      setIsRoomModifyModalOpen(true);
    };

  const handleSearchRoomVisited = (searchInput: string) =>
    setSearchRoomInput(searchInput);

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
            onClick={handleRoomSelection}
            onModify={handleRoomModify}
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
          rooms={userRoomsVisited?.map((rooms) => rooms.items).flat()}
          error={userRoomsErrorVisited}
          onDelete={handleRoomDelete}
          onClick={handleRoomSelection}
          onModify={handleRoomModify}
          onSearch={handleSearchRoomVisited}
          infinite={{
            setSize,
            size,
            isValidating,
            reachedEnd: reachedEndUserRoomsVisited,
          }}
        />
      </div>

      {isRoomCreateModalOpen && (
        <CreateRoomModal onClose={() => setIsRoomCreateModalOpen(false)} />
      )}
      {isRoomDeleteModalOpen && selectedRoom && (
        <DeleteRoomModal
          room={selectedRoom}
          onClose={() => setIsRoomDeleteModalOpen(false)}
        />
      )}
      {isRoomModifyModalOpen && selectedRoom && (
        <ModifyRoomModal
          room={selectedRoom}
          onClose={() => setIsRoomModifyModalOpen(false)}
        />
      )}
    </div>
  );
}

export default authenticatedRoute(Index);
