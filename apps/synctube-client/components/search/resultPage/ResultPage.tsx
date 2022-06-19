import { Video } from '@synctube-v2/types';
import { useScrollTreshold } from '../../../hooks/useScrollTreshold';
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

export function ResultPage({
  isError,
  data,
  size,
  setSize,
  isValidating,
  reachedEnd,
}: ResultPageProps): JSX.Element {
  const isRefreshing = isValidating && data && data.length === size;

  const handleScrollTreshold = () => {
    if (isValidating || reachedEnd) return;
    setSize(size + 1);
  };

  const ref = useScrollTreshold<HTMLDivElement>(80, handleScrollTreshold);

  return (
    <div ref={ref} className="overflow-auto flex-1 w-full flex flex-col">
      {isError && !data && <div>Error</div>}
      {data && !!data.length && (
        <>
          <div className="w-full flex-1">
            <VideosList video={data} />
          </div>

          {!reachedEnd && (
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
      {!data && !isError && (
        <div className=" w-full h-full flex flex-col items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
