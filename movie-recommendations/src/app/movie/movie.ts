export interface MovieListPage {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieResult[];
}

export interface MovieResult {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface MovieDiscover {
  api_key?: string;
  language?: string;
  region?: string;
  sort_by?: string;
  certification_country?: string;
  certification?: string;
  certificationGte?: string;
  certificationLte?: string;
  include_adult?: string;
  include_video?: string;
  page?: string;
  primary_release_year?: string;
  primary_release_yearGte?: string;
  primary_release_yearLte?: string;
  release_dateGte?: string;
  release_dateLte?: string;
  with_release_type?: string;
  year?: string;
  vote_countGte?: string;
  vote_countLte?: string;
  vote_averageGte?: string;
  vote_averageLte?: string;
  with_cast?: string;
  with_crew?: string;
  with_people?: string;
  with_companies?: string;
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
  without_keywords?: string;
  with_runtimeGte?: string;
  with_runtimeLte?: string;
  with_original_language?: string;
}
