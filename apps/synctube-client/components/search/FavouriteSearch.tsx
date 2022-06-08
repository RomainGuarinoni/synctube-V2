import { useFavourite } from '../../api/favourite';
import { ResultPage } from './resultPage/ResultPage';

import { SearchProps } from './searchProps';

export function FavouriteSearch({ searchInput }: SearchProps): JSX.Element {
  const { data, isError } = useFavourite(searchInput);

  return <ResultPage data={data} isError={isError} />;
}
