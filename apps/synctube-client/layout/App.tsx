import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'
      } w-screen h-screen px-8 flex flex-col`}
    >
      <Navbar />
      <main className={`bg-zinc-900 flex-1 rounded-2xl overflow-auto`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
