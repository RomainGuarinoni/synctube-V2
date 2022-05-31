import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useYoutubeSearch } from '../api/youtube';
import { Loader } from '../components/Loader';
import { authenticatedRoute } from '../guard/authenticatedRoute';

function Search(): JSX.Element {
  const { query, push } = useRouter();

  const [searchInput, setSearchInput] = useState('');

  const { data, isError } = useYoutubeSearch(searchInput);

  useEffect(() => {
    if (!query || !query.q) {
      push('/');
    }

    setSearchInput(query.q as string);
  }, [query, push]);

  if (!data || !searchInput) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-zinc-400">
        PUTIN D4ERREUR
      </div>
    );
  }

  return (
    <div>
      {data.items.map((item, key) => (
        <div key={key}>
          <p>{item.snippet.title} </p>
          <p>{item.snippet.description} </p>
        </div>
      ))}
    </div>
  );
}

export default authenticatedRoute(Search);
