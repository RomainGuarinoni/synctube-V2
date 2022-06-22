import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRoom } from '../../context/RoomContext';
import { Connexion } from './Connexion';
import { Logo } from './Logo';
import { Profil } from './Profil';
import { SearchBar } from './SearchBar';

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isUserInRoom } = useRoom();
  const connexions = 5; // TODO uopdate this with the server

  return (
    <nav
      className={`w-full h-16 flex items-center lg:justify-between justify-center `}
    >
      <div className="flex flex-row gap-8">
        <Logo />
        {isUserInRoom() && <Connexion connexions={connexions} />}
      </div>

      {isAuthenticated() && (
        <>
          {isUserInRoom() && <SearchBar />}
          <Profil />
        </>
      )}
    </nav>
  );
};
