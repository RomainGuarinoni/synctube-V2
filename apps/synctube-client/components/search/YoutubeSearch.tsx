import { useYoutubeSearch } from '../../api/youtube';
import { convertYoutubeVideo } from '../../utils/video';
import mockYoutubeResponse from '../../mock/youtubeResponse.json';
import { SearchProps } from './searchProps';
import { ResultPage } from './resultPage/ResultPage';

export function YoutubeSearch({ searchInput }: SearchProps): JSX.Element {
  const { data, isError, size, setSize } = useYoutubeSearch(searchInput);

  //   const { data: youtubeData, isError: youtubeError } = {
  //     data: mockYoutubeResponse as unknown as YoutubeResponse,
  //     isError: false,
  //   };

  const youtubeVideos = convertYoutubeVideo(data);

  return <ResultPage data={youtubeVideos} isError={isError} />;
}
