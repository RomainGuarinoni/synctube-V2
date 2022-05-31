import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { useOnclickOutside } from '../../hooks/useOnClickOutside';
import { useTranslation } from '../../hooks/useTranslation';
import { Select } from '../Select';

export function Profil(): JSX.Element {
  const {
    authState: { profil },
    logout,
    isAuthenticated,
  } = useAuth();

  const { profil: profilTranslation } = useTranslation();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <>
      {!isAuthenticated() ? (
        <div></div>
      ) : (
        <Select
          items={[{ label: profilTranslation.logout, callback: handleLogout }]}
        >
          <div className="rounded-full w-9 h-9 overflow-hidden relative">
            <Image
              src={profil?.picture || 'coucou'}
              alt="Google profil picture"
              title="Google profil picture"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="ml-2">
            {profil?.givenName} {profil?.familyName}
          </p>
        </Select>
      )}
    </>
  );
}
