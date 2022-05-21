import { useTheme } from '../context/ThemeContext';

export default function Index(): JSX.Element {
  const { theme } = useTheme();

  return (
    <p className="flex items-center justify-center h-full w-full">hello</p>
  );
}
