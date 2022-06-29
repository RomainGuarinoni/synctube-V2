import React, { useState } from 'react';
import { Room } from '@synctube-v2/types';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { createRoom } from '../../api/rooms';
import { routes } from '../../api/routes';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import { IClose } from '../icons/IClose';
import { IDelete } from '../icons/IDelete';
import { IRoom } from '../icons/IRoom';
import { Button } from '../shared/Button';
import { FormContainer } from '../shared/FormContainer';
import { Input } from '../shared/Input';
import { Loader } from '../shared/Loader';
import { Modal } from '../shared/Modal';
import { TextArea } from '../shared/TextArea';

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

  const [nameValidation, setNameValidation] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = () => {
    if (nameValidation !== room.name) {
      console.log('pas le bon inpujt de name');
      setError(true);
      return;
    }
    console.log('suppresiion validé');
  };

  return (
    <Modal onClose={onClose}>
      <FormContainer Icon={IDelete} onSubmit={onFormSubmit}>
        <div
          className="text-zinc-200 w-4 absolute top-4 right-5 cursor-pointer"
          onClick={onClose}
        >
          <IClose />
        </div>
        <div className="w-[30rem] h-[27rem] flex flex-col items-center justify-start text-zinc-200 px-10 gap-5 overflow-auto">
          <h3 className="font-bold text-xl">Supprimer la salle</h3>
          <p>
            Cette action ne peut pas être annulée. Cette action supprimera
            définitivement la salle {room.name}
            Veuillez taper <strong>{room.name}</strong> pour confirmer.
          </p>
          <Input
            label={'Nom de la salle'}
            onChange={(e) => setNameValidation(e.target.value)}
            value={nameValidation}
            type="text"
            title={modal.name}
            error={error ? "Le nom de la salle n'est pas bon" : undefined}
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
              <span className="font-bold">{modal.button}</span>
            </Button>
          )}
        </div>
      </FormContainer>
    </Modal>
  );
};
