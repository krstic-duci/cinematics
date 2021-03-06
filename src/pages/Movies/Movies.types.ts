export interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  isFavorite: boolean;
}

export interface MoviesItems {
  results: Movie[];
}

export interface MoviesResponse extends MoviesItems {
  page: number;
  total_pages: number;
  total_results: number;
}
