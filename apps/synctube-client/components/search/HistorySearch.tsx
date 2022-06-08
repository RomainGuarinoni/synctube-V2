import { useHistory } from '../../api/history';
import { ResultPage } from './resultPage/ResultPage';

import { SearchProps } from './searchProps';

export function HistorySearch({ searchInput }: SearchProps): JSX.Element {
  const { data, isError } = useHistory(searchInput);

  return <ResultPage data={data} isError={isError} />;
}
