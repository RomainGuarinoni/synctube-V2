import { Room, Profil } from '@synctube-v2/types';
import { MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { intervalToDuration } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import { IDelete } from '../icons/IDelete';

interface Props {
  room: Room;
  onDelete: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const RoomDescription: React.FC<Props> = ({ room, onDelete }) => {
  const {
    authState: { profil },
  } = useAuth();

  const {
    room: { description: descriptionText },
  } = useTranslation();

  const elapsedTime = intervalToDuration({
    start: new Date(room.createdAt),
    end: new Date(),
  });

  const handleRoomSelection = () => {
    console.log(room.name);
  };

  return (
    <button
      className="bg-zinc-800 hover:bg-zinc-700/60 text-zinc-200 rounded-lg cursor-pointer w-[33rem] mx-2 buttonContainer relative "
      onClick={handleRoomSelection}
    >
      {profil?.id === room.ownerProfil?.id && (
        <div
          onClick={onDelete(room)}
          className="text-red-500 hover:text-red-400/90 w-4 absolute top-2 left-2 z-10 "
        >
          <IDelete />
        </div>
      )}

      <div
        className={`w-full flex h-32
    justify-between items-center gap-3 px-5 py-2 border-2 border-transparent 
    transition-all duration-100 ease-linear 
    `}
      >
        <div className="h-full flex flex-col justify-around items-center overflow-hidden w-36">
          <div className="rounded-full w-14 h-14 overflow-hidden relative">
            <Image
              src={(room.ownerProfil as Profil).picture}
              alt="Google profil picture"
              title="Google profil picture"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-zinc-400">{descriptionText.createdBy}</p>

            <p className="font-bold">
              {profil?.id === room.ownerProfil?.id
                ? descriptionText.you
                : `${room.ownerProfil?.givenName} ${room.ownerProfil?.familyName}`}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{room.name}</h3>
          <p className="text-zinc-400 description">{room.description}</p>
        </div>
        <div className="flex flex-col items-center justify-around h-full">
          <div className="flex flex-col items-center leading-3">
            <p className="font-bold text-xl">{room.visitors.length}</p>
            <p className="text-zinc-400">{descriptionText.visitors}</p>
          </div>
          <div className="flex flex-col items-center leading-3">
            <p className="font-bold text-xl">
              {elapsedTime.years
                ? `${elapsedTime.years} ${descriptionText.year}`
                : elapsedTime.months
                ? `${elapsedTime.months} ${descriptionText.month}`
                : elapsedTime.days
                ? `${elapsedTime.days}  ${descriptionText.day}`
                : elapsedTime.hours
                ? `${elapsedTime.hours}  ${descriptionText.hour}`
                : elapsedTime.minutes
                ? `${elapsedTime.minutes}  ${descriptionText.minutes}`
                : `< 1 ${descriptionText.minutes}`}
            </p>
            <p className="text-zinc-400">{descriptionText.createdAt}</p>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .buttons {
            height: 0px;
            transition: all ease 200ms;
            opacity: 0;
          }

          .buttonContainer:hover > .buttons {
            opacity: 1;
            height: 3rem;
          }
        `}
      </style>
    </button>
  );
};
