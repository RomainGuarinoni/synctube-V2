import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';

interface ConnexionProps {
  connexions: number;
}

export function Connexion({ connexions }: ConnexionProps): JSX.Element {
  const { theme } = useTheme();

  const { connection: connectionText } = useTranslation();

  return (
    <div className="min-w-[7em] flex justify-end">
      <p
        className={`font-normal ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-800'
        }  items-center hidden lg:flex`}
      >
        <span className="font-weight text-red-500 text-lg mx-2">
          {connexions}{' '}
        </span>
        {connectionText}
      </p>
    </div>
  );
}
