import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieInfo } from './movie-info';

@Injectable({
  providedIn: 'root'
})
export class MovieInfoService {
  constructor(private http: HttpClient) { }

  getMovieInfo (movie_id: number){
    return this.http.get<MovieInfo>(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=f68c64ab26f5bb2a81e09f4af4dff582&language=en-US`);
  }
}
