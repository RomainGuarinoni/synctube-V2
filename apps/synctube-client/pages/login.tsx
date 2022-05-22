import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { Loader } from '../components/Loader';
import { useTranslation } from '../hooks/useTranslation';

interface CredentialResponse {
  /** This field is the returned ID token */
  credential?: string;
  /** This field sets how the credential is selected */
  select_by?:
    | 'auto'
    | 'user'
    | 'user_1tap'
    | 'user_2tap'
    | 'btn'
    | 'btn_confirm'
    | 'brn_add_session'
    | 'btn_confirm_add_session';
  clientId?: string;
}

export default function Login() {
  const { login } = useTranslation();

  const [googleError, setGoogleError] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleCredentials = (response: CredentialResponse) => {
    setGoogleError(false);
    setGoogleLoading(true);
  };

  const handleGoogleError = () => {
    setGoogleError(true);
  };

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xl">
      {googleLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-10">
            {login.welcome}
            <span className="text-red-500 font-bold text-xl  tracking-[0.4em] mx-2  ">
              SYNCTUBE
            </span>
          </h2>
          <p className="mb-10">{login.explanation} </p>
          <GoogleLogin
            onSuccess={handleGoogleCredentials}
            onError={handleGoogleError}
            text="signin_with"
          />
          {googleError && <p className="mt-10 text-red-500"> {login.error} </p>}
        </>
      )}
    </div>
  );
}
