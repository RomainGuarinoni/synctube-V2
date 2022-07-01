import { Room, Profil } from '@synctube-v2/types';
import { MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { intervalToDuration } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import { IPen } from '../icons/IPen';
import { IClose } from '../icons/IClose';

interface Props {
  room: Room;
  onClick: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
  onModify: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const RoomDescription: React.FC<Props> = ({
  room,
  onDelete,
  onClick,
  onModify,
}) => {
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

  return (
    <button
      className={`bg-zinc-800 hover:bg-zinc-700/60 text-zinc-200 rounded-lg cursor-pointer  relative border-transparent
    flex h-32 w-[33rem] justify-between items-center gap-3 mx-2 px-5 py-2 border-2  
    transition-all duration-100 ease-linear 
      `}
      onClick={onClick(room)}
    >
      {profil?.id === room.ownerProfil?.id && (
        <div className="w-2 h-full flex flex-col justify-around items-center">
          <div
            className={`text-amber-600 w-10 flex justify-center items-center h-10 rounded-full 
            bg-transparent hover:bg-amber-500/10 transition-all ease-in-out duration-100
            `}
            onClick={onModify(room)}
          >
            <span className="w-5">
              <IPen />
            </span>
          </div>
          <div
            className={`text-red-600 w-10 flex justify-center items-center h-10 rounded-full 
            bg-transparent hover:bg-red-500/10 transition-all ease-in-out duration-100
            `}
            onClick={onDelete(room)}
          >
            <span className="w-5">
              <IClose />
            </span>
          </div>
        </div>
      )}

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
        <h3 className="font-bold text-lg text-left">{room.name}</h3>
        <p className="text-zinc-400 description text-left">
          {room.description}
        </p>
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
      <style jsx>
        {`
          .description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </button>
  );
};
