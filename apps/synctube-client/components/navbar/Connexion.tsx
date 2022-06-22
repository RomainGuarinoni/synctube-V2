import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';

interface ConnexionProps {
  connexions: number;
}

export const Connexion: React.FC<ConnexionProps> = ({ connexions }) => {
  const { connection: connectionText } = useTranslation();

  return (
    <div className="flex w-20 ml-5 justify-end">
      <p
        className={`font-normal text-zinc-400
        items-center hidden lg:flex`}
      >
        <span className="font-weight text-red-500 text-lg mx-2">
          {connexions}
        </span>
        {connectionText}
      </p>
    </div>
  );
};
