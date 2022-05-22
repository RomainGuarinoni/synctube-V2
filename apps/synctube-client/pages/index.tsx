import { useTheme } from '../context/ThemeContext';

export default function Index(): JSX.Element {
  const { theme } = useTheme();

  // TODO update the return if the user is already logged in
  return <p className="text-zinc-400">INDEDX</p>;
}
