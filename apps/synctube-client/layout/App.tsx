import { Connexion } from '../components/Connexion';
import { Locales } from '../components/Locales';
import Logo from '../components/Logo';
import { Search } from '../components/Search';
import { useTheme } from '../context/ThemeContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme } = useTheme();

  const connexions = 5; // TODO uopdate this with the server

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'
      } w-screen h-screen px-8 flex flex-col`}
    >
      <header
        className={`w-full h-16 flex items-center lg:justify-between justify-center `}
      >
        <Logo />
        <Search />
        <Connexion connexions={connexions} />
      </header>
      <main className={`bg-zinc-900 flex-1 rounded-2xl`}>{children}</main>
      <footer className={`w-full h-14 flex items-center justify-center `}>
        <Locales />
      </footer>
    </div>
  );
}
