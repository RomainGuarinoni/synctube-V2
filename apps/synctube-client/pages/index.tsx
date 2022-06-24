import { useEffect, useState, MouseEvent as ReactMouseEvent } from 'react';
import { IHearth } from '../components/icons/IHearth';
import { IPlay } from '../components/icons/IPlay';
import { IRoom } from '../components/icons/IRoom';
import { FormContainer } from '../components/shared/FormContainer';
import { Modal } from '../components/shared/Modal';
import { authenticatedRoute } from '../guard/authenticatedRoute';

function Index(): JSX.Element {
  const [isRoomCreateModalOpen, setIsRoomCreateModalOpen] = useState(false);

  const handleCreateRoom = (
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
        <Modal onClose={() => setIsRoomCreateModalOpen(false)}>
          <FormContainer Icon={IRoom}>
            <div className="w-[35rem] h-[29rem] flex justify-center items-center">
              <p className="text-zinc-200 text-lg">Create your room</p>
            </div>
          </FormContainer>
        </Modal>
      )}
      <button onClick={handleCreateRoom}>Create a new room</button>
    </div>
  );
}

export default authenticatedRoute(Index);
