import { useRouter } from 'next/router';
import Image from 'next/image';

import { useAuth } from '../../context/AuthContext';
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
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
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
