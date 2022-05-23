import { useAuth } from '../context/AuthContext';

export default function Index(): JSX.Element {
  const { profil } = useAuth();
  return (
    <div className="text-zinc-400">
      {Object.entries(profil).map(([k, v]) => (
        <p key={k}>
          {' '}
          <strong> {k} </strong> : {v}{' '}
        </p>
      ))}
    </div>
  );
}
