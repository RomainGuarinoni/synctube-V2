import { Room } from '@synctube-v2/types';
import { MouseEvent as ReactMouseEvent } from 'react';
import { Loader } from '../shared/Loader';
import { RoomDescription } from './RoomDescription';

interface Props {
  title: string;
  rooms: Room[] | undefined;
  error: boolean | undefined;
  onDelete: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const RoomList: React.FC<Props> = ({
  title,
  rooms,
  error,
  onDelete,
}) => {
  return (
    <div className=" max-h-full  flex flex-col items-center justify-start ">
      <div className="w-full flex flex-col items-start justify-between h-10 mb-5">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="w-full h-1 bg-red-500"></span>
      </div>
      {rooms ? (
        <div className="w-full h-full flex flex-col justify-start items-start gap-5 overflow-y-auto overflow-x-hidden">
          {rooms.map((room) => (
            <RoomDescription key={room._id} room={room} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};
