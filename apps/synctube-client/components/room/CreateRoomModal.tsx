import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { createRoom } from '../../api/rooms';
import { routes } from '../../api/routes';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import { IClose } from '../icons/IClose';
import { IRoom } from '../icons/IRoom';
import { Button } from '../shared/Button';
import { FormContainer } from '../shared/FormContainer';
import { Input } from '../shared/Input';
import { Loader } from '../shared/Loader';
import { Modal } from '../shared/Modal';
import { TextArea } from '../shared/TextArea';

interface Props {
  onClose: () => void;
}

export const CreateRoomModal: React.FC<Props> = ({ onClose }) => {
  const {
    room: { modal },
    errors: { internal },
  } = useTranslation();

  const {
    authState: { profil },
  } = useAuth();

  const { mutate } = useSWRConfig();

  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const onFormSubmit = async () => {
    if (!profil) return;

    try {
      setLoading(true);
      await createRoom(roomName, roomDescription, profil.id);

      mutate(routes.rooms.getUserRoomsOwner(profil.id));

      toast.success(modal.created);
      onClose();
    } catch (err) {
      toast.error(internal);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Modal onClose={onClose}>
      <FormContainer Icon={IRoom} onSubmit={onFormSubmit}>
        <div
          className="text-zinc-200 w-4 absolute top-4 right-5 cursor-pointer"
          onClick={onClose}
        >
          <IClose />
        </div>
        <div className="w-[30rem] h-[27rem] flex flex-col items-center justify-start text-zinc-200 px-10 gap-5 overflow-auto">
          <h3 className="font-bold text-xl">{modal.title}</h3>
          <Input
            label={modal.name}
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            type="text"
            title={modal.name}
            required
          />
          <TextArea
            label={modal.description}
            onChange={(e) => setRoomDescription(e.target.value)}
            value={roomDescription}
            type="text"
            title={modal.description}
            maxLength={12}
          />
          {loading ? (
            <div className="relative top-5">
              <Loader />
            </div>
          ) : (
            <Button
              type="submit"
              size="large"
              bgClass="green-gradient"
              className="mt-2"
            >
              <span className="font-bold">{modal.button}</span>
            </Button>
          )}
        </div>
      </FormContainer>
    </Modal>
  );
};
