import React from 'react';
import { Locales } from './Locales';

export const Footer: React.FC = () => {
  return (
    <footer className={`w-full h-10 flex items-center justify-center `}>
      <Locales />
    </footer>
  );
};
