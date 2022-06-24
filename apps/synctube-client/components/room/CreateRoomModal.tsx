import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from '../../hooks/useTranslation';
import { IClose } from '../icons/IClose';
import { IRoom } from '../icons/IRoom';
import { Button } from '../shared/Button';
import { FormContainer } from '../shared/FormContainer';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { TextArea } from '../shared/TextArea';

interface Props {
  onClose: () => void;
}

export const CreateRoomModal: React.FC<Props> = ({ onClose }) => {
  const {
    room: { modal },
  } = useTranslation();

  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const [roomNameError, setRoomNameError] = useState('');
  const [roomDescriptionError, setRoomDescriptionError] = useState('');

  const onFormSubmit = () => {
    if (!roomName.trim()) {
      setRoomNameError(modal.error);
      return;
    }
    setRoomNameError('');

    if (!roomDescription.trim()) {
      setRoomDescriptionError(modal.error);
      return;
    }
    setRoomDescriptionError('');

    toast.success(modal.created);
    onClose();
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
            error={roomNameError}
          />
          <TextArea
            label={modal.description}
            onChange={(e) => setRoomDescription(e.target.value)}
            value={roomDescription}
            type="text"
            error={roomDescriptionError}
            title={modal.description}
          />
          <Button
            type="submit"
            size="large"
            bgClass="green-gradient"
            className="mt-2"
          >
            <span className="font-bold">{modal.button}</span>
          </Button>
        </div>
      </FormContainer>
    </Modal>
  );
};
