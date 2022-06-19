import { useRouter } from 'next/router';
import React from 'react';

export const Logo: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <h1
      id="synctube-logo"
      title="synctube"
      className="text-red-500 font-bold text-xl  tracking-[0.4em] cursor-pointer hidden lg:block "
      onClick={handleLogoClick}
    >
      SYNCTUBE
    </h1>
  );
};
