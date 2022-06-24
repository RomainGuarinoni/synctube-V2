import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { IHearth } from '../components/icons/IHearth';
import { IPlay } from '../components/icons/IPlay';
import { IRoom } from '../components/icons/IRoom';
import { FormContainer } from '../components/shared/FormContainer';
import { Modal } from '../components/shared/Modal';
import { CreateRoomModal } from '../components/room/CreateRoomModal';
import { authenticatedRoute } from '../guard/authenticatedRoute';

function Index(): JSX.Element {
  const [isRoomCreateModalOpen, setIsRoomCreateModalOpen] = useState(false);

  const handleCreateRoomOpen = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    setIsRoomCreateModalOpen(true);
  };

  useEffect(() => {
    console.log(isRoomCreateModalOpen);
  }, [isRoomCreateModalOpen]);

  return (
    <div>
      {isRoomCreateModalOpen && (
        <CreateRoomModal onClose={() => setIsRoomCreateModalOpen(false)} />
      )}
      <button onClick={handleCreateRoomOpen}>Create a new room</button>
    </div>
  );
}

export default authenticatedRoute(Index);
