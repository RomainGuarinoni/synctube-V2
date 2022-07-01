import React, { useState } from 'react';
import { Room } from '@synctube-v2/types';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { routes } from '../../../api/routes';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../shared/Button';
import { FormContainer } from '../../shared/FormContainer';
import { Input } from '../../shared/Input';
import { Loader } from '../../shared/Loader';
import { Modal } from '../../shared/Modal';
import { TextArea } from '../../shared/TextArea';
import { IPen } from '../../icons/IPen';
import { modifyRoom } from '../../../api/rooms';

interface Props {
  room: Room;
  onClose: () => void;
}

export const ModifyRoomModal: React.FC<Props> = ({ onClose, room }) => {
  const {
    room: { modal },
    errors: { internal },
  } = useTranslation();

  const {
    authState: { profil },
  } = useAuth();

  const { mutate } = useSWRConfig();

  const [roomName, setRoomName] = useState(room.name);
  const [roomDescription, setRoomDescription] = useState(
    room.description || '',
  );

  const [loading, setLoading] = useState(false);

  const onFormSubmit = async () => {
    if (!profil) return;

    try {
      setLoading(true);
      await modifyRoom(room._id, roomName, roomDescription);
      mutate(routes.rooms.getUserRoomsOwner(profil.id));

      toast.success(modal.modify.success);
      onClose();
    } catch (err) {
      toast.error(internal);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Modal onClose={onClose}>
      <FormContainer Icon={IPen} onSubmit={onFormSubmit} onClose={onClose}>
        <div className="w-[30rem] h-[27rem] flex flex-col items-center justify-start text-zinc-200 px-10 gap-5 overflow-auto">
          <h3 className="font-bold text-xl">{modal.modify.title}</h3>
          <Input
            label={modal.create.name}
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            type="text"
            title={modal.create.name}
            required
          />
          <TextArea
            label={modal.create.description}
            onChange={(e) => setRoomDescription(e.target.value)}
            value={roomDescription}
            type="text"
            title={modal.create.description}
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
              <span className="font-bold">{modal.modify.button}</span>
            </Button>
          )}
        </div>
      </FormContainer>
    </Modal>
  );
};
