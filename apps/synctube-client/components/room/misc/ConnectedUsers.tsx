import { Profil } from '@synctube-v2/types';
import Image from 'next/image';
import { useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useOnclickOutside } from '../../../hooks/useOnClickOutside';
import { Button } from '../../shared/Button';

const TRANSLATE_VALUE_PX = 10;

export const ConnectedUsers: React.FC = () => {
  const { getCurrentRoom } = useRoom();
  const [selectedUser, setSelectedUser] = useState<Profil | null>(null);
  const [userListOpen, setUserListOpen] = useState(false);

  const users = getCurrentRoom()?.connectedUsersList || [];

  const ref = useOnclickOutside<HTMLDivElement>(() => {
    setSelectedUser(null);
    setUserListOpen(false);
  });

  const handleUserClick = (user: Profil) => () => {
    setUserListOpen(false);
    setSelectedUser(user);
  };

  const excludeUser = (user: Profil) => () => {
    console.log('eclude user', user);
    setSelectedUser(null);
    setUserListOpen(false);
  };

  const getWithFunction = () => {
    let width = users.slice(0, 5).length * (40 - TRANSLATE_VALUE_PX);

    if (users.length > 5) {
      width += 40;
    }

    return width;
  };

  return (
    <div ref={ref} className="relative inline-flex">
      {users.slice(0, 5).map((user, index) => (
        <div
          key={user.id}
          className={`rounded-full w-10 h-10 overflow-hidden border-2 border-transparent box-border
           ease-in-out duration-100 cursor-pointer hover:border-2 hover:border-emerald-500 relative`}
          style={{
            left: `${-index * TRANSLATE_VALUE_PX}px`,
          }}
          onClick={handleUserClick(user)}
        >
          <Image
            src={user.picture}
            alt="Google profil picture"
            title="Google profil picture"
            layout="fill"
            objectFit="contain"
          />
        </div>
      ))}
      {users.length > 5 && (
        <div
          style={{
            left: `${-5 * TRANSLATE_VALUE_PX}px`,
          }}
          className={`relative rounded-full w-10 h-10 font-bold flex justify-center items-center text-zinc-200 bg-zinc-800
          ease-in-out duration-100 cursor-pointer hover:border-2 hover:border-emerald-500 border-2 border-transparent box-border
          `}
          onClick={() => {
            setUserListOpen(true);
            setSelectedUser(null);
          }}
        >
          {users.length - 5} +
        </div>
      )}

      {selectedUser && (
        <div
          className={`absolute top-11 transition-all ease-in-out duration-100 rounded-md 
        bg-zinc-800 px-5 py-2 min-w-[144px] flex flex-col items-center overflow-hidden`}
          style={{
            width: `${getWithFunction()}px`,
            right: `${TRANSLATE_VALUE_PX * users.length}px`,
          }}
        >
          <div className="leading-3 text-center mb-5">
            <p className="text-zinc-200 font-bold text-lg">
              {selectedUser.givenName}
            </p>
            <p className="text-zinc-400 uppercase ">
              {selectedUser.familyName}{' '}
            </p>
          </div>
          <Button
            onClick={excludeUser(selectedUser)}
            className="text-zinc-200"
            size="small"
          >
            Exclure
          </Button>
        </div>
      )}
      {userListOpen && (
        <div
          className={`absolute top-11 transition-all ease-in-out duration-100 rounded-md 
      bg-zinc-800 px-5 py-2 w-72 flex flex-col items-center overflow-visible`}
          style={{
            right: `${TRANSLATE_VALUE_PX * 5}px`,
          }}
        >
          {users.slice(5).map((user) => (
            <div
              key={user.id}
              className={`w-full   flex justify-between items-center  ${
                users.indexOf(user) !== users.length - 1 &&
                'border-b-2 border-b-zinc-400 pb-3 mb-3'
              }`}
            >
              <div className="text-center w-32 overflow-hidden">
                <p className="text-zinc-200 font-bold text-lg">
                  {user.givenName}
                </p>
                <p className="text-zinc-400 uppercase ">{user.familyName} </p>
              </div>
              <Button
                onClick={excludeUser(user)}
                className="text-zinc-200"
                size="small"
              >
                Exclure
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
