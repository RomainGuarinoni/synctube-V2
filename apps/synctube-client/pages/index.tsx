import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';

export default function Index(): JSX.Element {
  const { theme } = useTheme();

  console.log(theme);

  return (
    <main
      className={`${
        theme === 'dark' ? 'dark-background' : 'light-background'
      } `}
    >
      <header>
        <Logo />
      </header>
    </main>
  );
}
