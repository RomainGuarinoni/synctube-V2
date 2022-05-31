import { Connexion } from './Connexion';
import { Logo } from './Logo';
import { Profil } from './Profil';
import { Search } from './Search';

export default function Navbar(): JSX.Element {
  const connexions = 5; // TODO uopdate this with the server

  return (
    <header
      className={`w-full h-16 flex items-center lg:justify-between justify-center `}
    >
      <div className="flex flex-row">
        <Logo />
        <Connexion connexions={connexions} />
      </div>

      <Search />
      <Profil />
    </header>
  );
}
