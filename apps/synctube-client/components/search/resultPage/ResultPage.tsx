import { Video } from '@synctube-v2/types';
import { useObserver } from '../../../hooks/useObserver';
import { Loader } from '../../shared/Loader';
import { VideosList } from './VideosList';

interface ResultPageProps {
  isError: boolean | undefined;
  data: Video[] | undefined;
  size: number;
  setSize: (size: number) => void;
  isValidating: boolean;
}

export function ResultPage({
  isError,
  data,
  size,
  setSize,
  isValidating,
}: ResultPageProps): JSX.Element {
  const isRefreshing = isValidating && data && data.length === size;
  // const ref = useObserver<HTMLDivElement>(() => {
  //   if (!isRefreshing) {
  //     console.log('more data');
  //     setSize(size + 1);
  //   }
  // });

  return (
    <div className="overflow-auto flex-1 w-full flex flex-col">
      {isError && !data && <div>Error</div>}
      {data && !!data.length && (
        <>
          <div className="w-full flex-1">
            <VideosList video={data} />
          </div>

          <div
            // ref={ref}
            className="w-full flex items-center justify-center mt-8 text-zinc-200"
            onClick={() => {
              setSize(size + 1);
            }}
          >
            load more
          </div>
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
