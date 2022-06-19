import { Video } from '@synctube-v2/types';
import React from 'react';
import { useScrollTreshold } from '../../../hooks/useScrollTreshold';
import { useTranslation } from '../../../hooks/useTranslation';
import { Loader } from '../../shared/Loader';
import { VideosList } from './VideosList';

interface ResultPageProps {
  isError: boolean | undefined;
  data: Video[] | undefined;
  size: number;
  setSize: (size: number) => void;
  isValidating: boolean;
  reachedEnd: boolean;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  isError,
  data,
  size,
  setSize,
  isValidating,
  reachedEnd,
}) => {
  const {
    searchResult: { noMoreResult },
  } = useTranslation();

  const handleScrollTreshold = () => {
    if (isValidating || reachedEnd) return;
    setSize(size + 1);
  };

  const ref = useScrollTreshold<HTMLDivElement>(80, handleScrollTreshold);

  if (!!isError && !data) {
    return <div>Error</div>;
  }

  if ((!data || !data.length) && !isValidating) {
    return (
      <div className="flex-1 w-full flex text-red-500">
        <p className="m-auto"> Aucun résultats pour votre recherche</p>
      </div>
    );
  }

  if (!data && isValidating) {
    return (
      <div className="flex-1 w-full flex text-red-500 justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div ref={ref} className="overflow-auto flex-1 w-full flex flex-col">
      {!data && !isError && !isValidating}
      {data && !!data.length && (
        <>
          <div className="w-full flex-1">
            <VideosList video={data} />
          </div>

          {reachedEnd ? (
            <p className="w-full mt-8 text-center "> {noMoreResult}</p>
          ) : (
            <div
              className="w-full flex items-center justify-center mt-8 text-zinc-200"
              onClick={() => {
                setSize(size + 1);
              }}
            >
              <Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
};
