import { Room, Profil } from '@synctube-v2/types';
import Image from 'next/image';
import { intervalToDuration } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';

export const RoomDescription: React.FC<{ room: Room }> = ({
  room: { name, description, createdAt, ownerProfil, visitors },
}) => {
  const {
    authState: { profil },
  } = useAuth();

  const {
    room: { description: descriptionText },
  } = useTranslation();

  const elapsedTime = intervalToDuration({
    start: new Date(createdAt),
    end: new Date(),
  });

  return (
    <div
      className={`bg-zinc-800 rounded-lg w-[33rem] h-32 cursor-pointer flex 
    justify-between items-center gap-3 text-zinc-200 px-5 py-2 border-2 border-transparent 
    transition-all duration-100 ease-linear hover:bg-zinc-700/60
    `}
    >
      <div className="h-full flex flex-col justify-around items-center overflow-hidden w-36">
        <div className="rounded-full w-14 h-14 overflow-hidden relative">
          <Image
            src={(ownerProfil as Profil).picture}
            alt="Google profil picture"
            title="Google profil picture"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-zinc-400">Créé par</p>

          <p className="font-bold">
            {profil?.id === ownerProfil?.id
              ? descriptionText.you
              : `${ownerProfil?.givenName} ${ownerProfil?.familyName}`}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-zinc-400 description">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-around h-full">
        <div className="flex flex-col items-center">
          <p className="font-bold text-xl">{visitors.length}</p>
          <p className="text-zinc-400">{descriptionText.visitors}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-xl">
            {elapsedTime.years
              ? `> ${elapsedTime.years} ${descriptionText.year}`
              : elapsedTime.months
              ? `> ${elapsedTime.months} ${descriptionText.year}`
              : elapsedTime.days
              ? `> ${elapsedTime.days}  ${descriptionText.year}`
              : '< 1 jours'}
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
    </div>
  );
};
