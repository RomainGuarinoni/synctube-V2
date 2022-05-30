import { useAuth } from '../context/AuthContext';

export default function Index(): JSX.Element {
  const {
    authState: { profil },
  } = useAuth();

  return (
    <div className="text-zinc-400">
      <img src={profil?.picture} alt="preofil image" />
      {profil?.familyName} {profil?.givenName}
    </div>
  );
}
