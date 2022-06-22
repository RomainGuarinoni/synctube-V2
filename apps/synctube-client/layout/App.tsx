import { useTheme } from '../context/ThemeContext';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`
       bg-zinc-800 w-screen h-screen px-8 flex flex-col`}
    >
      <Navbar />
      <main
        className={`flex-1 bg-zinc-900 rounded-2xl overflow-auto px-10 py-5`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
