export interface Paginate<T> {
  items: T[];
  nextPageToken?: string;
  previousPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
