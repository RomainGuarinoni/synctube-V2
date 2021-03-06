import React, { useState } from 'react';
import { Room } from '@synctube-v2/types';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { deleteRoom } from '../../../api/rooms';
import { routes } from '../../../api/routes';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { IDelete } from '../../icons/IDelete';
import { Button } from '../../shared/Button';
import { FormContainer } from '../../shared/FormContainer';
import { Input } from '../../shared/Input';
import { Loader } from '../../shared/Loader';
import { Modal } from '../../shared/Modal';

interface Props {
  onClose: () => void;
  room: Room;
}

export const DeleteRoomModal: React.FC<Props> = ({ onClose, room }) => {
  const {
    room: { modal },
    errors: { internal },
  } = useTranslation();

  const {
    authState: { profil },
  } = useAuth();

  const { mutate } = useSWRConfig();

  const [nameValidation, setNameValidation] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async () => {
    if (nameValidation !== room.name) {
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);

    try {
      if (!profil) throw new Error('Profil is undefined');

      await deleteRoom(room._id);
      mutate(routes.rooms.getUserRoomsOwner(profil.id));
      setLoading(false);
      onClose();
    } catch (err) {
      toast.error(internal);
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <FormContainer Icon={IDelete} onSubmit={onFormSubmit} onClose={onClose}>
        <div className="w-[30rem] py-8 flex flex-col items-center justify-start text-zinc-200 px-10 gap-5 overflow-auto">
          <h3 className="font-bold text-xl">{modal.delete.title}</h3>
          <p className="w-full">
            {modal.delete.explanation} <strong>{room.name}</strong>
          </p>
          <p className="w-full">
            {modal.delete.typing}{' '}
            <strong className="text-emerald-500">{room.name}</strong>{' '}
            {modal.delete.confirm}
          </p>
          <Input
            label={'Nom de la salle'}
            onChange={(e) => setNameValidation(e.target.value)}
            value={nameValidation}
            type="text"
            title={room.name}
            error={error ? modal.delete.error : undefined}
            required
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
              <span className="font-bold">{modal.delete.button}</span>
            </Button>
          )}
        </div>
      </FormContainer>
    </Modal>
  );
};
