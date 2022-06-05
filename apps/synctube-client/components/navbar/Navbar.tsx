import { useAuth } from '../../context/AuthContext';
import { Connexion } from './Connexion';
import { Logo } from './Logo';
import { Profil } from './Profil';
import { SearchBar } from './SearchBar';

export default function Navbar(): JSX.Element {
  const { isAuthenticated } = useAuth();
  const connexions = 5; // TODO uopdate this with the server

  return (
    <header
      className={`w-full h-16 flex items-center lg:justify-between justify-center `}
    >
      <div className="flex flex-row gap-8">
        <Logo />
        {isAuthenticated() && <Connexion connexions={connexions} />}
      </div>

      {isAuthenticated() && (
        <>
          <SearchBar />
          <Profil />
        </>
      )}
    </header>
  );
}
