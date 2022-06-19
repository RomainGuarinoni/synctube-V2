import { useRouter } from 'next/router';
import React from 'react';
import { LOCALES } from '../../i18n/translation';

export const Locales: React.FC = () => {
  const router = useRouter();

  const { pathname, asPath, query } = router;

  const handleLocaleChange = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div className="text-zinc-400">
      {LOCALES.map((locale, index) => (
        <span
          className="cursor-pointer"
          onClick={() => {
            handleLocaleChange(locale);
          }}
          key={`locale-${index}`}
        >
          {' '}
          {capitalizeFirstLetter(locale)} {index < LOCALES.length - 1 && '/'}
        </span>
      ))}
    </div>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
