import { Room } from '@synctube-v2/types';
import { MouseEvent as ReactMouseEvent } from 'react';
import { Search } from '../shared/Search';
import { Loader } from '../shared/Loader';
import { useScrollTreshold } from '../../hooks/useScrollTreshold';
import { RoomDescription } from './RoomDescription';

interface Props {
  title: string;
  rooms: Room[] | undefined;
  error: boolean | undefined;
  onClick: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
  onModify: (
    room: Room,
  ) => (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSearch?: (searchInput: string) => void;
  infinite?: {
    size: number;
    setSize: (size: number) => void;
    isValidating: boolean;
    reachedEnd: boolean;
  };
}

export const RoomList: React.FC<Props> = ({
  title,
  rooms,
  error,
  onDelete,
  onClick,
  onModify,
  onSearch,
  infinite,
}) => {
  const handleScrollTreshold = () => {
    if (!infinite || infinite.isValidating || infinite.reachedEnd) return;
    infinite.setSize(infinite.size + 1);
  };

  const ref = useScrollTreshold<HTMLDivElement>(80, handleScrollTreshold);

  return (
    <div className="max-h-full flex flex-col items-center justify-start ">
      <div className="w-full flex flex-col items-start justify-between h-10 mb-5">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="w-full h-1 bg-red-500"></span>
      </div>
      {onSearch && (
        <div className="w-[33rem] h-12 mb-5">
          <Search handleSubmit={onSearch} withBorder />
        </div>
      )}
      {rooms ? (
        <div
          ref={ref}
          className="w-full h-full flex flex-col justify-start items-start gap-5 overflow-y-auto overflow-x-hidden"
        >
          {rooms.map((room) => (
            <RoomDescription
              key={room._id}
              room={room}
              onDelete={onDelete}
              onClick={onClick}
              onModify={onModify}
            />
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
