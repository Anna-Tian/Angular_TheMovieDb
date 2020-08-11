import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieListPage, MovieResult, MovieDiscover } from './movie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  discover: MovieDiscover = {
    api_key: 'api_key=f68c64ab26f5bb2a81e09f4af4dff582',
    language: '',
    region: '',
    sort_by: '',
    certification_country: '',
    certification: '',
    certificationGte: '',
    certificationLte: '',
    include_adult: '&include_adult=false',
    include_video: '',
    page: '',
    primary_release_year: '',
    primary_release_yearGte: '',
    primary_release_yearLte: '',
    release_dateGte: '',
    release_dateLte: '',
    with_release_type: '',
    year: '',
    vote_countGte: '',
    vote_countLte: '',
    vote_averageGte: '',
    vote_averageLte: '',
    with_cast: '',
    with_crew: '',
    with_people: '',
    with_companies: '',
    with_genres: '',
    without_genres: '',
    with_keywords: '',
    without_keywords: '',
    with_runtimeGte: '',
    with_runtimeLte: '',
    with_original_language: ''
  };
  constructor(private http: HttpClient) { }

  getPopularMoviePage(movieDiscover: MovieDiscover) {
    for (const [key, value] of Object.entries(movieDiscover)) {
      if (key in this.discover) {
        this.discover[key] = value;
      }
    }
    return this.http.get<MovieListPage>(`https://api.themoviedb.org/3/discover/movie?${this.getMovieDiscoverString()}`);
  }
  getPopularMovieList(movieDiscover: MovieDiscover) {
    const subject = new Subject<Array<MovieResult>>();

    this.getPopularMoviePage(movieDiscover).subscribe((movies) => {
      subject.next(movies.results);
    });
    return subject.asObservable();
  }

  getMovieDiscoverString() {
    let request: string;
    request = `${this.discover.api_key}${this.discover.language}${this.discover.region}${this.discover.sort_by}`;
    request = `${request}${this.discover.certification_country}${this.discover.certification}${this.discover.certificationGte}${this.discover.certificationLte}`;
    request = `${request}${this.discover.include_adult}${this.discover.include_video}${this.discover.page}${this.discover.primary_release_year}`;
    request = `${request}${this.discover.primary_release_yearGte}${this.discover.primary_release_yearLte}${this.discover.release_dateGte}${this.discover.release_dateLte}`;
    request = `${request}${this.discover.with_release_type}${this.discover.year}${this.discover.vote_countGte}${this.discover.vote_countLte}`;
    request = `${request}${this.discover.vote_averageGte}${this.discover.vote_averageLte}${this.discover.with_cast}${this.discover.with_crew}`;
    request = `${request}${this.discover.with_people}${this.discover.with_companies}${this.discover.with_genres}${this.discover.without_genres}`;
    request = `${request}${this.discover.with_keywords}${this.discover.without_keywords}${this.discover.with_runtimeGte}${this.discover.with_runtimeLte}${this.discover.with_original_language}`;
    console.log('request: ', request);
    return request;
  }
}
