import React from 'react';
import { useHistory } from '../../api/history';
import { ResultPage } from './resultPage/ResultPage';

import { SearchProps } from './searchProps';

export const HistorySearch: React.FC<SearchProps> = ({ searchInput }) => {
  const { data, isError } = useHistory(searchInput);

  return (
    <ResultPage
      data={data}
      isError={isError}
      size={2}
      setSize={() => {
        return;
      }}
      isValidating={false}
      reachedEnd={false}
    />
  );
};
