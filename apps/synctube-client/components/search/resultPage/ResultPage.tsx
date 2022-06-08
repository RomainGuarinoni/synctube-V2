import { Video } from '@synctube-v2/types';
import { Loader } from '../../shared/Loader';
import { VideosList } from './VideosList';

interface ResultPageProps {
  isError: boolean;
  data: Video[] | undefined;
}

export function ResultPage({ isError, data }: ResultPageProps): JSX.Element {
  return (
    <div className="overflow-auto flex-1">
      {isError && <div>Error</div>}
      {data && (
        <>
          {/* {' '}
        <button
          onClick={() => {
            setYoutubeSize(youtubeSize + 1);
          }}
        >
          Load more
        </button>{' '}
        <p>Items : {getDataAndErrorOfSelected().data?.length}</p> */}
          <VideosList video={data} />
        </>
      )}
      {!data && (
        <div className=" w-full h-full flex flex-col items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
