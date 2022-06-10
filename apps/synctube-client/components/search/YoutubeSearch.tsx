import { useYoutubeSearch } from '../../api/youtube';
import { convertYoutubeVideo } from '../../utils/video';
import mockYoutubeResponse from '../../mock/youtubeResponse.json';
import { SearchProps } from './searchProps';
import { ResultPage } from './resultPage/ResultPage';

export function YoutubeSearch({ searchInput }: SearchProps): JSX.Element {
  // const { data, isError, size, setSize, isValidating } =
  //   useYoutubeSearch(searchInput);

  const { data, isError, size, setSize, isValidating } = {
    data: [mockYoutubeResponse] as any,
    isError: false,
    size: 1,
    setSize: () => {
      return;
    },
    isValidating: true,
  };

  const youtubeVideos = convertYoutubeVideo(data);

  return (
    <ResultPage
      data={youtubeVideos}
      isError={isError}
      size={size}
      setSize={setSize}
      isValidating={isValidating}
    />
  );
}
