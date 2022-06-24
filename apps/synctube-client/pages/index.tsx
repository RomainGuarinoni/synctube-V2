import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { CreateRoomModal } from '../components/room/CreateRoomModal';
import { RoomDescription } from '../components/room/RoomDescription';
import { authenticatedRoute } from '../guard/authenticatedRoute';
import { useGetUserRoomsOwner, useGetUserRoomsVisited } from '../api/rooms';
import { useAuth } from '../context/AuthContext';

function Index(): JSX.Element {
  const {
    authState: { profil },
  } = useAuth();

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

  useEffect(() => {
    console.log(userRoomsOwner);
  }, [userRoomsOwner]);

  useEffect(() => {
    console.log(userRoomsVisited);
  }, [userRoomsVisited]);

  const handleCreateRoomOpen = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    setIsRoomCreateModalOpen(true);
  };

  return (
    <div className="">
      <h2></h2>
      {isRoomCreateModalOpen && (
        <CreateRoomModal onClose={() => setIsRoomCreateModalOpen(false)} />
      )}
      <div className="flex flex-col gap-4"></div>
    </div>
  );
}

export default authenticatedRoute(Index);
